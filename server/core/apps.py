from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        try:
            # register any signals
            import core.signals
        except ImportError:
            pass
