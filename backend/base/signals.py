# base/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import ContactMessage
from django.conf import settings


@receiver(post_save, sender=ContactMessage)
def send_email_on_message(sender, instance, created, **kwargs):
    if created:
        subject = f"New message from {instance.name}"
        message = f"""
        New contact form submission:

        Name: {instance.name}
        Email: {instance.email}
        Message: {instance.message}

        Time: {instance.timestamp}
        """

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )