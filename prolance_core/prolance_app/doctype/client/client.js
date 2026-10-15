// Copyright (c) 2026, zoul and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client', {
    refresh: function(frm) {
        calculate_commission(frm);
    },

    invoice_amount: function(frm) {
        calculate_commission(frm);
    },

    comission_percentage: function(frm) {
        calculate_commission(frm);
    }
});

function calculate_commission(frm) {
    if (frm.doc.invoice_amount != null && frm.doc.comission_percentage != null) {
        frm.set_value('comission_amount',frm.doc.invoice_amount * frm.doc.comission_percentage / 100
        );
    }
}
