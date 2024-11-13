frappe.ui.form.on("Topic", {
    module_name: function(frm) {
        const queries = {
            "exam_on_sales_module": ["Sales Module Questions", "docstatus", "=", 1],
            "exam_on_accounts": ["Accounts Module Questions", "docstatus", "=", 1],
            "exam_on_manufacturing": ["Manufacturing Module Questions", "docstatus", "=", 1],
            "exam_on_buying_module": ["Buying Module Questions", "docstatus", "=", 1]
        };

        Object.keys(queries).forEach(field => {
            frm.fields_dict[field].get_query = function(doc, cdt, cdn) {
                return {
                    filters: [
                        [queries[field][0], queries[field][1], queries[field][2], queries[field][3]]
                    ]
                };
            };
        });
    }
});


