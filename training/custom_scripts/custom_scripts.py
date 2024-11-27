import frappe
from frappe import _

def prevent_file_attachments(doc, method):
    if doc.attached_to_doctype == 'Sales Module Questions' :
        file_mime_type = doc.get('file_type') 
        allowedExtensions = ['MP4', 'AVI', 'MOV', 'MKV']; 
        if not file_mime_type or file_mime_type not in allowedExtensions:
            frappe.throw(_("Only Video files are allowed as attachments."))

    # if doc.attached_to_doctype == "Sales Module Questions" and doc.attached_to_name:
    #     sales_order = frappe.get_doc("Sales Module Questions", doc.attached_to_name)
    #     if sales_order.docstatus == 1:
    #         frappe.throw(_("You cannot attach a file to a submitted Sales Module Questions."))
    
    if doc.attached_to_doctype == 'Buying Module Questions' :
        file_mime_type = doc.get('file_type') 
        allowedExtensions = ['MP4', 'AVI', 'MOV', 'MKV']; 
        if not file_mime_type or file_mime_type not in allowedExtensions:
            frappe.throw(_("Only Video files are allowed as attachments."))

    if doc.attached_to_doctype == 'Accounts Module Questions' :
        file_mime_type = doc.get('file_type') 
        allowedExtensions = ['MP4', 'AVI', 'MOV', 'MKV']; 
        if not file_mime_type or file_mime_type not in allowedExtensions:
            frappe.throw(_("Only Video files are allowed as attachments."))
    
    # if doc.attached_to_doctype == 'Manufacturing Module Questions' :
    #     file_mime_type = doc.get('file_type') 
    #     allowedExtensions = ['MP4', 'AVI', 'MOV', 'MKV']; 
    #     if not file_mime_type or file_mime_type not in allowedExtensions:
    #         frappe.throw(_("Only Video files are allowed as attachments."))





# def prevent_file_attachment(doc, method):
#     if doc.attached_to_doctype == "Sales Module Questions" and doc.attached_to_name:
#         sales_order = frappe.get_doc("Sales Module Questions", doc.attached_to_name)
#         if sales_order.docstatus == 1:
#             frappe.throw(_("You cannot attach a file to a submitted Sales Module Questions."))


