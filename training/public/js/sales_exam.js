
frappe.ui.form.on('Sales Module Questions', {
    before_submit: function(frm) {
        var saq1_value = frm.doc.saq1; 
        var saq2_value = frm.doc.saq2;  
        var pt_value = frm.doc.creating_customer;     

        if ((saq1_value && saq1_value.length < 50) || 
            (saq2_value && saq2_value.length < 50) || 
            (pt_value && pt_value.length < 50)) {

            frappe.msgprint({
                title: __('Validation Error'),
                message: __('All Short Answer and Practical Questions must be at least 50 characters long before submitting.'),
                indicator: 'red'
            });
           
            frappe.validated = false;
        } else if (!saq1_value || !saq2_value || !pt_value) {
            frappe.msgprint({
                title: __('Validation Error'),
                message: __('All Short Answer and Practical Questions are mandatory.'),
                indicator: 'red'
            });

            frappe.validated = false;
        }
    }
});
