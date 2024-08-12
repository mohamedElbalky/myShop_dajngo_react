from django.apps import AppConfig


class XUsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'x_users'
    
    def ready(self):
        import x_users.signals
