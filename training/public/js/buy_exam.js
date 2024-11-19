frappe.ui.form.on('Buying Module Questions', {
    validate: function(frm) {
        
        var field_value1 = frm.doc.creating_supplier;
       

        if ((field_value1 && field_value1.length < 50)) {
            frappe.msgprint({
                title: __('Validation Error'),
                message: __('The field value must be at least 50 characters long.'),
                indicator: 'red'
            });
           
            frappe.validated = false;
        }
    }
});


