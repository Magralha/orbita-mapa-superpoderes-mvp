# Órbita — Privacy, Consent and Minor-Safety Checklist

> Product/engineering checklist for the pilot. This is not a legal opinion. Final wording, lawful basis, consent requirements and retention rules must be reviewed by qualified Brazilian privacy/legal counsel before real minors are onboarded.

## Product principles already reflected in V4

- No public child leaderboard.
- No social-credit score.
- Power signals are developmental signals, not diagnoses.
- Family views are designed for conversation and opportunity, not grading.
- School/municipality views should prefer aggregate data.
- Mission evidence is optional.
- A missed mission is not punitive and does not create a false development signal.
- Adults acknowledge completion; they do not approve/reject the child's identity or power score.

## Before real-user onboarding

### 1. Data inventory

Document every collected field and why it is needed:

- account identity;
- student-school-class relationship;
- guardian-student relationship;
- educator-school-class relationship;
- agent choice;
- XP and level;
- developmental event history;
- mission assignments/completions;
- optional mission evidence;
- experiences;
- interest signals derived from events;
- device/session/analytics data.

For each field define:

- purpose;
- source;
- who can see it;
- retention period;
- deletion behavior.

### 2. Consent / authorization flow

Define and legally validate:

- school authorization process;
- guardian consent/authorization when required;
- age-appropriate student notice/assent;
- versioned acceptance record;
- ability to withdraw when legally applicable;
- what happens to the account after withdrawal.

Do not treat the current demo login as consent.

### 3. Age-appropriate notice

The student-facing notice should explain in simple language:

- what Órbita records;
- why it records it;
- that answers do not define a profession or identity;
- which adults may see information;
- that optional evidence is optional;
- how to ask for help or data deletion.

### 4. Access model

Required production rules:

- student: own profile and assigned missions only;
- family: linked student only;
- educator: authorized school/classes only;
- municipality: aggregate views by default;
- admin: audited operational access.

Raw power totals must not be directly editable by family/school accounts.

### 5. Data minimization

Avoid collecting unless required:

- precise geolocation;
- biometric data;
- unnecessary free-text personal data;
- health information;
- political/religious beliefs;
- private communications;
- continuous background tracking.

Mission prompts should not encourage disclosure of sensitive personal information.

### 6. Free-text evidence

Because free text can accidentally contain personal/sensitive information:

- keep it optional;
- limit length;
- show age-appropriate guidance;
- define moderation/escalation procedure;
- define who can read evidence;
- define deletion/retention.

### 7. Retention and deletion

Before launch define:

- inactive account retention;
- end-of-school-year behavior;
- class transfer behavior;
- guardian unlink behavior;
- school exit behavior;
- deletion/export request workflow;
- backup deletion timelines.

### 8. Security

Before real users:

- HTTPS only;
- managed authentication;
- MFA for privileged/admin users where appropriate;
- row-level authorization;
- no production secrets in browser bundles;
- audit privileged actions;
- encrypted managed database/backups;
- rate limiting and abuse controls;
- dependency/security update process.

### 9. Analytics

Analytics must measure product behavior, not create a hidden student ranking.

Recommended events:

- sign in;
- mission opened;
- mission completed;
- weekly return;
- Passaporte opened;
- experience registered;
- family/school mission assigned;
- mission acknowledged.

Avoid sending optional mission evidence to general-purpose analytics tools.

### 10. Pilot incident plan

Define:

- privacy/security contact;
- account lock procedure;
- incorrect school/family link correction;
- inappropriate evidence escalation;
- data incident escalation;
- user support channel.

## Legal review gate

Real minor accounts should remain blocked until the project has approved:

- privacy notice;
- terms/use rules;
- consent/authorization flow;
- retention schedule;
- access matrix;
- processor/vendor review;
- incident procedure.
