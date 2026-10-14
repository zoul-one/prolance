# Copyright (c) 2026, zoul and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re

class BusinessProfile(Document):
    def validate(self):
        if self.phone:
            if not re.fullmatch(r"\d{10}", self.phone):
                frappe.throw("Phone number must contain exactly 10 digits.")
