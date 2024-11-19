frappe.ui.form.on('Sales Module Questions', {
    validate: function(frm) {
        
        var field_value1 = frm.doc.creating_customer;
        var field_value2 = frm.doc.creating_so;

        if ((field_value1 && field_value1.length < 50) || (field_value2 && field_value2.length < 50)) {
            frappe.msgprint({
                title: __('Validation Error'),
                message: __('The field value must be at least 50 characters long.'),
                indicator: 'red'
            });
           
            frappe.validated = false;
        }
    }
});


