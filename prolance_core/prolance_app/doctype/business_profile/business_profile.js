// Copyright (c) 2026, zoul and contributors
// For license information, please see license.txt

frappe.ui.form.on('Business Profile', {
    refresh: function(frm) {
        frm.add_custom_button('Add a new client', () => {
            frappe.new_doc('Client', {freelancer: frm.doc.your_name});
        });
    }
});