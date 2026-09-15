# Raise Complaint Flow — Summary of Changes

This document details all changes made to the **Raise Complaint** flow in comparison to the previously pushed codebase.

---

## 1. Summary of Updated Files

| File | Primary Changes |
| :--- | :--- |
| [`src/pages/citizen/raise-complaint/schema.ts`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/pages/citizen/raise-complaint/schema.ts) | Unified address schemas, added `isUrban`, `urbanPanchayat`, `ward`, `landmark`, `addressLine2`; renamed `subdivision` to `block`; removed `ps`; updated validation logic. |
| [`src/pages/citizen/raise-complaint/helpers.ts`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/pages/citizen/raise-complaint/helpers.ts) | Updated `getFormData` multipart serialization to include all new keys (`isUrban`, `urbanPanchayat`, `ward`, `block`, `landmark`, `addressLine2`). |
| [`src/pages/citizen/raise-complaint/hooks.ts`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/pages/citizen/raise-complaint/hooks.ts) | Integrated 6 unified address endpoints; added conditional query enabling (`isUrban`); added cascading field clearing in `useClearAddressFields`; unified location hook. |
| [`src/pages/citizen/raise-complaint/components/AddressSection.tsx`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/pages/citizen/raise-complaint/components/AddressSection.tsx) | Added Urban/Rural badge toggle (`RhfBadgeSelect`); made `thana` text input; made `village`, `urbanPanchayat`, `ward` dynamic `RhfSelect`s; added `landmark` and `addressLine2`; updated `getAddressLabels` & "Same as Permanent Address" live-sync. |
| [`src/pages/citizen/raise-complaint/components/LocationDetailsSection.tsx`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/pages/citizen/raise-complaint/components/LocationDetailsSection.tsx) | Replaced legacy division/subdivision hierarchy with the unified schema; added Urban/Rural area toggle with dynamic ULB/Ward vs Block/Panchayat/Village/Thana fields; added `landmark`. |
| [`src/api/address.api.ts`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/api/address.api.ts) | Added endpoints for `villages`, `ulbs`, `wards`, and removed `location.api.ts`. |

---

## 2. API Endpoints & Hierarchy

The legacy `location.api.ts` (`/address/divisions`, `/address/divisions/:id/districts`, etc.) has been removed. Both **Applicant Address** and **Location of Occurrence** now fetch from the same unified hierarchy in [`src/api/address.api.ts`](file:///Users/deadisalive/coding/triangle/bihar-govt/client-frontend/src/api/address.api.ts):

1. **Districts**: `GET /address/districts`
2. **Subdivision / Blocks (Rural)**: `GET /address/districts/:districtId/blocks`
3. **Panchayats (Rural)**: `GET /address/blocks/:blockId/panchayats`
4. **Villages (Rural)**: `GET /address/panchayats/:panchayatId/villages`
5. **Urban Panchayats / ULBs (Urban)**: `GET /address/districts/:districtId/ulbs`
6. **Wards (Urban)**: `GET /address/ulbs/:ulbId/wards`

### Query Enabling Conditions in `useGetAddressFields`:
- **Districts**: Always enabled when `enabled === true`.
- **Blocks**: Enabled when `!isUrban && Boolean(districtId)`.
- **Panchayats**: Enabled when `!isUrban && Boolean(blockId)`.
- **Villages**: Enabled when `!isUrban && Boolean(panchayatId)`.
- **Urban Panchayats (ULBs)**: Enabled when `isUrban && Boolean(districtId)`.
- **Wards**: Enabled when `isUrban && Boolean(ulbId)`.

---

## 3. Schema & Validation Changes (`schema.ts`)

### Key Changes:
- **`subdivision` renamed to `block`**: All address objects (`citizenInfo.address`, `address`, `location`) now use `block` instead of `subdivision`.
- **`ps` removed**: Post office field has been completely removed.
- **`isUrban`**: Boolean flag defaulting to `false` (Rural).
- **`thana`**: Changed from required select to optional string (max 50 chars).
- **`landmark`**: Added as optional string (max 50 chars) across all address schemas.
- **`addressLine2`**: Added as optional string (max 50 chars) for correspondence address when state is not Bihar.
- **`pincode`**: Regex updated to `/^$|^8\d{5}$/` to allow optional/valid 6-digit Bihar pincodes starting with `8`.

### Validation Rules (`superRefine`):
- **Permanent Address (`citizenInfo.address`) & Location Details (`location`)**:
  - `addressLine` & `district` are always required.
  - If `isUrban === true`: `urbanPanchayat` and `ward` are required.
  - If `isUrban === false`: `block` and `panchayat` are required.
- **Correspondence Address (`address`)**:
  - `state` is always required.
  - If `state !== "Bihar"`: `addressLine` and `city` are required.
  - If `state === "Bihar"`: follows standard Bihar address schema fields.

---

## 4. UI & Form Field Layout Changes

### Applicant Permanent Address & Location Details:
1. **Area Type Selector**: Urban / Rural toggle using `RhfBadgeSelect`.
2. **When Urban**:
   - `Address Line` (required text input)
   - `District` (required dropdown)
   - `Municipal Corporation / Council / Nagar Panchayat` (`urbanPanchayat` dropdown, dependent on `district`)
   - `Ward` (`ward` dropdown, dependent on `urbanPanchayat`)
   - `Landmark` (optional text input)
   - `Pin Code` (numeric text input)
3. **When Rural**:
   - `Address Line` (required text input)
   - `District` (required dropdown)
   - `Block / Subdivision` (`block` dropdown, dependent on `district`)
   - `Panchayat` (`panchayat` dropdown, dependent on `block`)
   - `Village` (`village` dropdown, dependent on `panchayat`)
   - `Thana` (text input, swapped position with village)
   - `Landmark` (optional text input)
   - `Pin Code` (numeric text input)

### Correspondence Address:
1. **State Selector**: State dropdown.
2. **If State != Bihar**:
   - `City` (required dropdown)
   - `Address Line` (required text input)
   - `Address Line 2` (optional text input for apartment/suite/landmark)
   - `Pin Code` (numeric text input)
3. **If State == Bihar**:
   - Shows Area Type (Urban / Rural) toggle, District, Urban/Rural dependent fields, Landmark, and Pin Code.
4. **"Same as Permanent Address" Checkbox**:
   - Rendered in header only when State is Bihar.
   - Synchronizes `isUrban`, `addressLine`, `state`, `district`, `block`, `panchayat`, `village`, `urbanPanchayat`, `ward`, `thana`, `landmark`, and `pincode`.
   - Uses `getAddressLabels` to map ID values to localized names for correspondence address.
   - Automatically unchecks and resets correspondence fields when state is switched away from Bihar.

### Cascading Field Clearing (`useClearAddressFields`):
- Switching `isUrban`: Clears rural fields if switching to urban; clears urban fields if switching to rural.
- Changing `district`: Clears `block`, `panchayat`, `thana`, `village`, `urbanPanchayat`, and `ward`.
- Changing `block`: Clears `panchayat`, `village`, and `thana`.
- Changing `panchayat`: Clears `village`.
- Changing `urbanPanchayat`: Clears `ward`.

---

## 5. Serialization & Helpers (`helpers.ts`)

In `getFormData`, the following fields are serialized into FormData:
- `citizenInfo[address][isUrban]`, `citizenInfo[address][addressLine]`, `citizenInfo[address][district]`, `citizenInfo[address][urbanPanchayat]`, `citizenInfo[address][ward]`, `citizenInfo[address][block]`, `citizenInfo[address][panchayat]`, `citizenInfo[address][thana]`, `citizenInfo[address][village]`, `citizenInfo[address][landmark]`, `citizenInfo[address][pincode]`
- `address[isUrban]`, `address[addressLine]`, `address[addressLine2]`, `address[state]`, `address[city]`, `address[district]`, `address[urbanPanchayat]`, `address[ward]`, `address[block]`, `address[panchayat]`, `address[thana]`, `address[village]`, `address[landmark]`, `address[pincode]`
- `location[isUrban]`, `location[addressLine]`, `location[district]`, `location[urbanPanchayat]`, `location[ward]`, `location[block]`, `location[panchayat]`, `location[thana]`, `location[village]`, `location[landmark]`, `location[pincode]`
