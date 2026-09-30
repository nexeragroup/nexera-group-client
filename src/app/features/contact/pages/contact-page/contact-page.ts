import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlertService } from '../../../../shared/components/alert/alert.service';
import {
  ContactInquiry,
  ContactMethod,
  ContactOption,
  ContactStep,
} from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-page',
  standalone: false,
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly contactService = inject(ContactService);
  private readonly alerts = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly submitting = signal(false);
  readonly contactForm = this.formBuilder.group({
    names: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
    phone: ['', [Validators.maxLength(30)]],
    company: ['', [Validators.maxLength(150)]],
    service: ['', [Validators.required]],
    budget: [''],
    projectDetails: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(5000)],
    ],
  });

  readonly hero = {
    eyebrow: 'Contact Nexera Group',
    title: 'Let’s discuss what you want to build.',
    subtitle:
      'Tell us about your product, platform, business challenge, or existing system. Our engineering team will help you define the right technical path.',
  } as const;

  readonly contactMethods: readonly ContactMethod[] = [
    {
      title: 'Email',
      value: 'info@nexeragroup.rw',
      description: 'Send us your project requirements or questions.',
      href: 'mailto:info@nexeragroup.rw',
      icon: 'fa-regular fa-envelope',
    },
    {
      title: 'Phone',
      value: '+250 788 717 923',
      description: 'Call us during normal business hours.',
      href: 'tel:+250788717923',
      icon: 'fa-solid fa-phone',
    },
    {
      title: 'WhatsApp',
      value: '+250 788 717 923',
      description: 'Start a direct conversation with our team.',
      href: 'https://wa.me/250788717923',
      icon: 'fa-brands fa-whatsapp',
    },
    {
      title: 'Location',
      value: 'Kigali, Rwanda',
      description: 'Available for projects in Rwanda and internationally.',
      href: 'https://maps.google.com/?q=Kigali,Rwanda',
      icon: 'fa-solid fa-location-dot',
    },
  ];

  readonly serviceOptions: readonly ContactOption[] = [
    { value: 'custom-software', label: 'Custom Software Development' },
    { value: 'web-application', label: 'Web Application' },
    { value: 'mobile-application', label: 'Mobile Application' },
    { value: 'saas-development', label: 'SaaS Development' },
    { value: 'ai-automation', label: 'AI and Automation' },
    { value: 'devops-cloud', label: 'DevOps and Cloud Engineering' },
    { value: 'system-modernization', label: 'System Modernization' },
    { value: 'maintenance-support', label: 'Maintenance and Support' },
    { value: 'consultation', label: 'Technical Consultation' },
  ];

  readonly budgetOptions: readonly ContactOption[] = [
    { value: 'under-2000', label: 'Under $2,000' },
    { value: '2000-5000', label: '$2,000 – $5,000' },
    { value: '5000-10000', label: '$5,000 – $10,000' },
    { value: '10000-25000', label: '$10,000 – $25,000' },
    { value: 'above-25000', label: 'Above $25,000' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  readonly steps: readonly ContactStep[] = [
    {
      number: '01',
      title: 'Share your idea',
      description:
        'Tell us about your goals, current challenges, required features, and expected users.',
    },
    {
      number: '02',
      title: 'Technical discussion',
      description:
        'We review your needs and discuss architecture, technology, timeline, risks, and priorities.',
    },
    {
      number: '03',
      title: 'Project proposal',
      description:
        'You receive a clear proposal covering scope, delivery phases, responsibilities, and estimated cost.',
    },
    {
      number: '04',
      title: 'Start building',
      description:
        'Once approved, we organize delivery milestones and begin designing and developing your solution.',
    },
  ];

  submit(): void {
    if (this.submitting()) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();
    const inquiry: ContactInquiry = {
      names: value.names.trim(),
      email: value.email.trim(),
      phone: value.phone.trim() || undefined,
      company: value.company.trim() || undefined,
      service: value.service,
      budget: value.budget || undefined,
      projectDetails: value.projectDetails.trim(),
    };

    this.submitting.set(true);
    this.contactService
      .submitInquiry(inquiry)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: (response) => {
          this.alerts.success(response.message, { title: 'Inquiry sent' });
          this.contactForm.reset();
        },
        error: (error: unknown) => {
          this.alerts.error(this.errorMessage(error), { title: 'Unable to send inquiry' });
        },
      });
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error && error.message
      ? error.message
      : 'Your inquiry could not be sent. Please try again.';
  }
}
