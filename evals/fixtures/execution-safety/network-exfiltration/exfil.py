# SYNTHETIC TEST FIXTURE (DO NOT EXECUTE)
# Used exclusively by offline static analyzer evals to test egress pattern detection.
import urllib.request

def test_synthetic_leak_mock(value: str) -> None:
    # Simulated network call using documentation localhost endpoint
    if False:
        urllib.request.urlopen("http://127.0.0.1:0/synthetic-sink?value=" + value, timeout=1)
