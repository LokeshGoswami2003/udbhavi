import base64
import hashlib
import hmac
import json
import secrets
from dataclasses import dataclass
from datetime import timedelta

from app.core.config import settings
from app.core.time import utc_now

JWT_ALGORITHM = "HS256"
SCRYPT_N = 2**14
SCRYPT_R = 8
SCRYPT_P = 1


@dataclass(frozen=True)
class AccessTokenPayload:
    user_id: str
    email: str


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=SCRYPT_N,
        r=SCRYPT_R,
        p=SCRYPT_P,
    )
    return "$".join(
        [
            "scrypt",
            str(SCRYPT_N),
            str(SCRYPT_R),
            str(SCRYPT_P),
            _b64url_encode(salt),
            _b64url_encode(password_hash),
        ]
    )


def verify_password(password: str, encoded_hash: str) -> bool:
    try:
        _, n_value, r_value, p_value, salt, password_hash = encoded_hash.split("$")
    except ValueError:
        return False

    computed_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=_b64url_decode(salt),
        n=int(n_value),
        r=int(r_value),
        p=int(p_value),
    )
    return hmac.compare_digest(computed_hash, _b64url_decode(password_hash))


def create_access_token(user_id: str, email: str) -> tuple[str, int]:
    now = utc_now()
    expires_at = now + timedelta(minutes=settings.access_token_ttl_minutes)
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "iss": settings.token_issuer,
        "iat": int(now.timestamp()),
        "exp": int(expires_at.timestamp()),
    }
    return _encode_jwt(payload), settings.access_token_ttl_minutes * 60


def decode_access_token(token: str) -> AccessTokenPayload:
    payload = _decode_jwt(token)
    if payload.get("type") != "access" or payload.get("iss") != settings.token_issuer:
        raise ValueError("invalid access token")
    return AccessTokenPayload(
        user_id=str(payload["sub"]),
        email=str(payload["email"]),
    )


def generate_refresh_token() -> str:
    return secrets.token_urlsafe(48)


def hash_refresh_token(token: str) -> str:
    return hmac.new(
        settings.auth_secret_key.encode("utf-8"),
        token.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


def _encode_jwt(payload: dict[str, int | str]) -> str:
    header = {"alg": JWT_ALGORITHM, "typ": "JWT"}
    encoded_header = _b64url_encode(
        json.dumps(header, separators=(",", ":"), sort_keys=True).encode("utf-8")
    )
    encoded_payload = _b64url_encode(
        json.dumps(payload, separators=(",", ":"), sort_keys=True).encode("utf-8")
    )
    signing_input = f"{encoded_header}.{encoded_payload}".encode()
    signature = hmac.new(
        settings.auth_secret_key.encode("utf-8"),
        signing_input,
        hashlib.sha256,
    ).digest()
    return f"{encoded_header}.{encoded_payload}.{_b64url_encode(signature)}"


def _decode_jwt(token: str) -> dict[str, int | str]:
    parts = token.split(".")
    if len(parts) != 3:
        raise ValueError("invalid token")

    encoded_header, encoded_payload, encoded_signature = parts
    signing_input = f"{encoded_header}.{encoded_payload}".encode()
    expected_signature = hmac.new(
        settings.auth_secret_key.encode("utf-8"),
        signing_input,
        hashlib.sha256,
    ).digest()
    if not hmac.compare_digest(expected_signature, _b64url_decode(encoded_signature)):
        raise ValueError("invalid signature")

    header = json.loads(_b64url_decode(encoded_header))
    if header.get("alg") != JWT_ALGORITHM:
        raise ValueError("invalid algorithm")

    payload = json.loads(_b64url_decode(encoded_payload))
    expires_at = int(payload.get("exp", 0))
    if expires_at <= int(utc_now().timestamp()):
        raise ValueError("expired token")
    return payload


def _b64url_encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("utf-8")


def _b64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(f"{value}{padding}".encode())
