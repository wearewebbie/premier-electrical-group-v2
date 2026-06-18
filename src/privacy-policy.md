---
title: Privacy Policy
description: Privacy Policy for {{ site.title }}
permalink: /privacy-policy/
layout: md/md.njk
---

# Privacy Policy

**Last updated: {{ page.date | dateFormat }}**

## 1. Introduction

{{ site.title }} ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you visit {{ site.url }}.

{% if site.email %}
If you have any questions or concerns about this policy please contact us at {{ site.email }}.
{% endif %}

## 2. Who We Are

**Business Name:** {{ site.title }}  
**Website:** {{ site.url }}  
{% if site.email %}**Email:** {{ site.email }}{% endif %}
{% if site.phone %}**Phone:** {{ site.phone }}{% endif %}

## 3. What Information We Collect

We only collect personal information that you voluntarily provide when you submit our contact form. This may include:

- Your name
- Your email address
- Your phone number (if provided)
- The content of your message

We do not collect any information automatically. We do not use cookies, tracking pixels, or any analytics tools on this website.

## 4. How We Use Your Information

We use the information you provide solely to:

- Respond to your enquiry
- Communicate with you regarding your request

We will never use your information for marketing purposes without your explicit consent.

## 5. How Your Data is Processed

Our contact form is powered by FormSpark, a third party form processing service. When you submit any of our forms your data is transmitted to and processed on FormSpark's servers, where it is temporarily stored before being forwarded to us via email.

We do not operate our own database or server to store your personal data. Once your enquiry has been responded to, we retain your email correspondence only for as long as is necessary for legitimate business record keeping purposes.

You can review FormSpark's privacy policy at [https://formspark.io/legal/privacy-policy/](https://formspark.io/legal/privacy-policy/).

## 6. Sharing Your Information

We do not sell, trade, or share your personal information with any third parties beyond FormSpark as described in section 5. Your data will never be passed on to any other organisation without your explicit consent, except where required by law.

## 7. Third Party Links

Our website may contain links to third party websites. Please note that we have no control over the content or privacy practices of those sites and we are not responsible for their policies. We encourage you to review the privacy policy of any site you visit.

## 8. Your Rights

Depending on your location you may have certain rights regarding your personal data, which may include:

- **Right to access** — you can request a copy of the personal data we hold about you
- **Right to rectification** — you can request that we correct any inaccurate data
- **Right to erasure** — you can request that we delete your personal data
- **Right to restrict processing** — you can request that we limit how we use your data
- **Right to object** — you can object to us processing your personal data

{% if site.email %}
To exercise any of these rights please contact us at {{ site.email }}. We will respond to your request within 30 days.
{% else %}
To exercise any of these rights please contact us directly. We will respond to your request within 30 days.
{% endif %}

## 9. Changes to This Policy

We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date at the top. We encourage you to review this policy periodically.

## 10. Contact Us

If you have any questions about this privacy policy or how we handle your data please get in touch:

{% if site.email %}**Email:** {{ site.email }}  {% endif %}
{% if site.phone %}**Phone:** {{ site.phone }}  {% endif %}