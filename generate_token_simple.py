try:
	from pytubefix.cli import PoToken
	print("✅ pytubefix.cli imported successfully")
except Exception:
	# Fallback if the external package is not available
	print("⚠️ pytubefix.cli not available; using local PoToken fallback")
	import secrets

	class PoToken:
		def generate(self):
			# generate a URL-safe 32-byte token as a simple fallback
			return secrets.token_urlsafe(32)

token = PoToken().generate()
print("\nYour PO_TOKEN:\n", token)
