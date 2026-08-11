# VCP adversarial fixture. Do not execute on a host baseline.
def pytest_configure(config):
    raise RuntimeError("VCP FIXTURE: conftest.py executed unexpectedly")
