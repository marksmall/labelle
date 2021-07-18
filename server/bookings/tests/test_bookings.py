""" Tests for bookings """
import pytest


@pytest.mark.django_db
class TestBookingsViewSet:
    """
    Test booking views.
    """
    def test_bookings_list_all_staff(self):
        """ List bookings covering all staff. """
        pass

    def test_bookings_list_for_individual_staff(self):
        """ List bookings covering a single staff member. """
        pass

    def test_bookings_list_all_customers(self):
        """ List bookings for all customers. """
        pass

    def test_bookings_list_for_individual_customer(self):
        """ List bookings covering a single customer. """
        pass

    def test_bookings_list_all_staff_availability(self):
        """ List all staff availability. """
        pass

    def test_bookings_list_individual_staff_availability(self):
        """ List single staff member availability. """
        pass


@pytest.mark.django_db
class TestServiceViewSet:
    """
    Test service views, services are things people can book appointments for.
    """
    def test_services_list_all(self):
        """ List all services. """
        pass
