# Raise Complaint Form Changes Specification

This document details the newly added fields, removed/deprecated fields, conditional validation rules, and the multi-step form structure for the **Raise Complaint** (`RaiseComplaint`) form.

---

## 1. 🗂️ Multi-Step Wizard Flow

| Step | Step Name | Description | Sections Included |
| :--- | :--- | :--- | :--- |
| **Step 1** | **Basic Info** (*बुनियादी जानकारी*) | Citizen Details | • **Applicant Information** (`CitizenInfoSection`)<br>• **Communication Preferences** (`CommunicationSection`) |
| **Step 2** | **Location / Address** (*स्थान एवं पता*) | Address Details | • **Permanent Address** (`citizenInfo.address`)<br>• **Correspondence Address** (`address`) |
| **Step 3** | **Complaint Details** (*शिकायत विवरण*) | Category, Description & Incident Details | • **Complaint Classification** (`ClassificationSection`)<br>• **Incident Location** (`LocationDetailsSection`)<br>• **Beneficiary & Vulnerability** (`ImpactSection`)<br>• **Attachments & Evidence** (`AttachmentsSection`) |

---

## 2. ➕ Newly Added & Updated Fields

### A. Permanent Address (`citizenInfo.address`)
*Added to capture the applicant's permanent residence in Bihar.*

| Field Path | Field Label | Component / Input Type | Validation & Rules |
| :--- | :--- | :--- | :--- |
| `citizenInfo.address.addressLine` | Address Line (*पता विवरण*) | Text Input | **Required** (Min 1 character) |
| `citizenInfo.address.district` | District (*ज़िला*) | Select Dropdown | **Required** — Populated dynamically from Demographics API (`useGetDemographics`) |
| `citizenInfo.address.subdivision` | Block / Subdivision (*प्रखंड / अनुमंडल*) | Select Dropdown | **Required** — Filtered dynamically based on selected District via `sub-divisions.json` |
| `citizenInfo.address.panchayat` | Panchayat (*पंचायत*) | Text Input | **Required** |
| `citizenInfo.address.thana` | Thana (*थाना*) | Text Input | **Required** |
| `citizenInfo.address.pincode` | Pin Code (*पिन कोड*) | Number Input | **Required** — Exactly 6 digits (`maxLength={6}`, numbers only) |

---

### B. Correspondence Address (`address`)
*Supports both intra-state (Bihar) and inter-state correspondence addresses.*

| Field Path | Field Label | Component / Input Type | Validation & Conditional Rules |
| :--- | :--- | :--- | :--- |
| `isCrpEqualPerAdd` | Same as Permanent Address (*स्थायी पते के समान*) | Checkbox | **Optional toggle** — When checked, auto-fills correspondence address with permanent address values and disables correspondence address input fields. |
| `address.addressLine` | Address Line (*पता विवरण*) | Text Input | **Required** (Min 1 character) |
| `address.state` | State (*राज्य*) | Select Dropdown | **Required** — Options loaded from `states_cities.json`. Default value is `"Bihar"`. |
| `address.city` | City (*शहर*) | Select Dropdown | **Conditional**: **Required** only if `state !== "Bihar"`. Hidden/Optional if `state === "Bihar"`. Options loaded dynamically based on selected State from `states_cities.json`. |
| `address.district` | District (*ज़िला*) | Select Dropdown | **Conditional**: **Required** if `state === "Bihar"`. Optional if `state !== "Bihar"`. Options from Demographics API. |
| `address.subdivision` | Block / Subdivision (*प्रखंड / अनुमंडल*) | Select Dropdown | **Conditional**: **Required** if `state === "Bihar"`. Optional if `state !== "Bihar"`. Filtered by selected District. |
| `address.panchayat` | Panchayat (*पंचायत*) | Text Input | **Conditional**: **Required** if `state === "Bihar"`. Optional if `state !== "Bihar"`. |
| `address.thana` | Thana (*थाना*) | Text Input | **Conditional**: **Required** if `state === "Bihar"`. Optional if `state !== "Bihar"`. |
| `address.pincode` | Pin Code (*पिन कोड*) | Number Input | **Required** — Exactly 6 digits (`maxLength={6}`, numbers only). |

> **State Change Rule:** Whenever `address.state` changes in the correspondence address, dependent fields (`city`, `district`, `subdivision`, `panchayat`, `thana`) are automatically cleared.

---

### C. Attachments & Evidence Enhancements (`AttachmentsSection`)

| Feature | Details | Condition / Rule |
| :--- | :--- | :--- |
| **Max File Size** | Dynamic MB limit check | Fetched from server configuration via `useGetConfig()` (`grievanceMaxUploadSizeMB`, fallback: `1MB`). |
| **Allowed File Types** | Whitelist Check | Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `audio/mpeg`. |
| **File Preview in New Tab** | Interactive Thumbnail Preview | Clicking an uploaded file thumbnail or file title opens the file object directly in a new browser tab via `window.open(URL.createObjectURL(file), "_blank")`. |

---

## 3. ❌ Removed / Commented / Deprecated Fields

| Field Path | Previous Section | Reason / Replacement |
| :--- | :--- | :--- |
| `classification.subject` | Classification | Removed from UI and validation schema. Replaced by department/service categorization and detailed description in `evidence.details`. |
| `evidence.occurrenceDate` | Evidence | Removed from grievance registration flow. |
| `evidence.frequency` | Evidence | Removed from grievance registration flow. |
| `communication.preferredMode` | Communication | Removed from UI and schema. Notifications default to SMS/Phone. |
| `location.villageOrWard` | Incident Location | Removed in favor of standardized `panchayat` and `block` fields. |
| `location.landmark` | Incident Location | Removed from location requirements. |

---

## 4. 🔒 Read-Only & Pre-Populated Fields

| Field Path | Source | Behavior |
| :--- | :--- | :--- |
| `citizenInfo.mobile` | `profile.mobile` | **Disabled / Read-only** (Citizen cannot change their verified login mobile number). |
| `citizenInfo.fullName` | `profile.fullName` | Pre-filled if present in profile; optional in schema. |
| `citizenInfo.email` | `profile.email` | Pre-filled if present in profile; optional, validated if entered. |
| `citizenInfo.preferredLanguage` | `profile.preferredLanguage` | Pre-selected (English / Hindi). **Required**. |
| `communication.feedbackConsent` | Form input | Checkbox (**Required** to proceed). |

---

## 5. 📦 Form Data Payload Structure (`getFormData`)

All values and file binaries are serialized to `FormData` for submission:

```
citizenInfo[fullName]                          = string (optional)
citizenInfo[mobile]                            = string (required)
citizenInfo[alternateMobile]                   = string (optional)
citizenInfo[email]                             = string (optional)
citizenInfo[preferredLanguage]                 = string (required)
citizenInfo[address][addressLine]              = string (required)
citizenInfo[address][district]                 = string (required)
citizenInfo[address][subdivision]              = string (required)
citizenInfo[address][panchayat]                = string (required)
citizenInfo[address][thana]                    = string (required)
citizenInfo[address][pincode]                  = string (required)

address[addressLine]                           = string (required)
address[state]                                 = string (required)
address[city]                                  = string (required if state !== "Bihar")
address[district]                              = string (required if state === "Bihar")
address[subdivision]                           = string (required if state === "Bihar")
address[panchayat]                             = string (required if state === "Bihar")
address[thana]                                 = string (required if state === "Bihar")
address[pincode]                               = string (required)

isCrpEqualPerAdd                               = "true" | "false"

classification[department]                     = string (required)
classification[service]                        = string (required)
classification[subService]                     = string (required)
classification[nature]                         = string (required)

evidence[details]                              = string (description text)

impact[affectedBeneficiary]                    = string (required)
impact[vulnerability[seniorCitizen]]           = "true" | "false"
impact[vulnerability[woman]]                   = "true" | "false"
impact[vulnerability[personWithDisability]]     = "true" | "false"
impact[vulnerability[economicallyWeakerSection]] = "true" | "false"

communication[feedbackConsent]                 = "true" | "false"

location[division]                             = string (required)
location[district]                             = string (required)
location[subdivision]                          = string (required)
location[block]                                = string (required)
location[panchayat]                            = string (required)
location[pincode]                              = string (required)

attachments[]                                  = File (binary array)
```
