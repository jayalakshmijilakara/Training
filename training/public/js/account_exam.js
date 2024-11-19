frappe.ui.form.on('Accounts Module Questions', {
    validate: function(frm) {
        
        var field_value1 = frm.doc.how_do_you_set_up_and_manage_fiscal_years_in_erpnext;
       

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


