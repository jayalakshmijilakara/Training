
frappe.ui.form.on('Manufacturing Module Questions', {
    before_submit: function(frm) {
        var saq2_value = frm.doc.saq2;
        var saq1_value = frm.doc.saq1;

        if ((!saq2_value || saq2_value.length < 50) || (!saq1_value || saq1_value.length < 50)) {
            frappe.msgprint({
                title: __('Validation Error'),
                message: __('Both Short Answer Questions must contain at least 50 characters before submitting.'),
                indicator: 'red'
            });

            frappe.validated = false;
        }
    }
});



