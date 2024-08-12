from django.contrib import admin


from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group


from unfold.admin import ModelAdmin
from unfold.admin import StackedInline
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.contrib.filters.admin import (
    # RangeDateFilter,
    RangeDateTimeFilter,
)
from unfold.contrib.filters.admin import (
    RangeNumericListFilter,
    RangeNumericFilter,
)

from import_export.admin import ImportExportModelAdmin

# Register your models here.


from .models import Product, Order, OrderItem, ShippingAdress, Review

User = get_user_model()


class ReviewInline(StackedInline):
    """For ProductAdmin"""

    model = Review
    extra = 1
    tab = True


@admin.register(Product)
class ProductAdmin(ModelAdmin, ImportExportModelAdmin):
    readonly_fields = ("uuid", "createdAt", "updatedAt")
    list_display = ("name", "price")
    search_fields = ("name", "category")
    list_filter_submit = True  # Submit button at the bottom of the filter
    list_filter = (("price", RangeNumericFilter), ("createdAt", RangeDateTimeFilter))
    
    inlines = [ReviewInline]
    
    # import and export data
    import_form_class = ImportForm
    export_form_class = ExportForm
    export_form_class = SelectableFieldsExportForm



class OrderItemInline(StackedInline):
    """For OrderAdmin"""

    model = OrderItem
    extra = 1
    tab = True


class ShippingAdressInline(StackedInline):
    """For OrderAdmin"""

    model = ShippingAdress
    extra = 1
    tab = True


@admin.register(Order)
class OrderAdmin(ModelAdmin, ImportExportModelAdmin):
    readonly_fields = ("uuid", "createdAt", "updatedAt")
    list_filter_submit = True  # Submit button at the bottom of the filter
    list_filter = ("user", "totalPrice", "isPaid", "paidAt", ("createdAt", RangeDateTimeFilter))

    
    inlines = [OrderItemInline, ShippingAdressInline]
    
    # import and export data
    import_form_class = ImportForm
    export_form_class = ExportForm
    export_form_class = SelectableFieldsExportForm


class OrderInline(StackedInline):
    """For CustomUserAdmin"""
    model = Order
    extra = 1
    verbose_name_plural = "User Orders"
    tab = True

    


    
    
admin.site.unregister(User)
admin.site.unregister(Group)
@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    inlines = [OrderInline]

@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass