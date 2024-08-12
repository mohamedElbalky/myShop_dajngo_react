from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model



User = get_user_model()


@receiver(pre_save, sender=User)
def update_user_pre_save(sender, instance, **kwargs):
    if instance.email != "":
        instance.username = instance.email

