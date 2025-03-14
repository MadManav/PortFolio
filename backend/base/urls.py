from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, contact_submit  # Add contact_submit here

router = DefaultRouter()
router.register(r'contact-messages', ContactMessageViewSet)

urlpatterns = [
    path('contact-submit/', contact_submit, name='contact_submit'),
    path('', include(router.urls)),
]