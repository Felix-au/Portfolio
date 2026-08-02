import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './ContactSection.module.css';

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [inputs, setInputs] = useState<FormInputs>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (fields: FormInputs): FormErrors => {
    const nextErrors: FormErrors = {};
    
    if (!fields.name || fields.name.trim() === '') {
      nextErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email || fields.email.trim() === '') {
      nextErrors.email = 'Email address is required';
    } else if (!emailRegex.test(fields.email.trim())) {
      nextErrors.email = 'Please enter a valid email address';
    }
    
    if (!fields.message || fields.message.trim() === '') {
      nextErrors.message = 'Message is required';
    }
    
    return nextErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
    
    if (touched[name]) {
      setErrors(validate(nextInputs));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(inputs));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set all fields to touched to trigger full validation display
    setTouched({ name: true, email: true, message: true });
    
    const formErrors = validate(inputs);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputs.name.trim(),
          email: inputs.email.trim(),
          message: inputs.message.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form.');
      }
      
      setStatus('success');
      setInputs({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Header Title & Subtitle */}
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.sectionSubtitle}>
          Have a project in mind, want to collaborate, or just say hello? Drop me a message and I'll get back to you shortly.
        </p>

        {/* Contact Form Card */}
        <div className={styles.contactCard}>
          {/* Subtle watermark background logo */}
          <Mail className={styles.bgWatermark} />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-card"
                className={styles.successContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <CheckCircle2 size={56} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out! Your message has been routed successfully. I will be in touch with you soon.
                </p>
                <button onClick={handleReset} className={styles.resetBtn}>
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                className={styles.form}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                noValidate
              >
                {/* Global Status Alert on Error */}
                {status === 'error' && (
                  <div className={`${styles.statusAlert} ${styles.statusAlertError}`}>
                    <AlertCircle size={16} className={styles.statusAlertIcon} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={inputs.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="Your Name"
                      className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                      required
                    />
                    <User size={16} className={styles.inputIcon} />
                  </div>
                  {errors.name && touched.name && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={inputs.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="you@example.com"
                      className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                      required
                    />
                    <Mail size={16} className={styles.inputIcon} />
                  </div>
                  {errors.email && touched.email && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <div className={styles.inputWrapper}>
                    <textarea
                      id="message"
                      name="message"
                      value={inputs.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="Your Message..."
                      className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
                      required
                    />
                    <MessageSquare size={16} className={styles.inputIcon} style={{ top: '14px' }} />
                  </div>
                  {errors.message && touched.message && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={styles.submitBtn}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className={styles.spinner} />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
