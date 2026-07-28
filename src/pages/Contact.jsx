import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === 'name' && !value.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Name is required.' }));
    } else if (name === 'email') {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email.' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    } else if (name === 'message' && !value.trim()) {
      setErrors((prev) => ({ ...prev, message: 'Message is required.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    }
  };

  const contactInfo = [
    { icon: FiMapPin, title: 'Address', value: '123 Book Street, Reading City, RC 12345' },
    { icon: FiPhone, title: 'Phone', value: '+1 (555) 123-4567' },
    { icon: FiMail, title: 'Email', value: 'hello@bookstore.com' },
  ];

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-text">
            Have a question or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-panel">
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-text">
                Reach out to us through any of the following channels.
              </p>
              <div className="contact-info-list">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="contact-info-item">
                      <div className="contact-info-icon">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="contact-info-label">{info.title}</h4>
                        <p className="contact-info-value">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">&#10003;</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="contact-form-title">Send a Message</h2>
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <InputField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                      touched={touched.name}
                      placeholder="Your name"
                    />
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                      placeholder="abc@gmail.com"
                    />
                    <InputField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                    <div className="contact-textarea-group">
                      <label className="input-label" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className={`contact-textarea ${touched.message && errors.message ? 'contact-textarea-error' : ''}`}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write your message..."
                        rows={5}
                      />
                      {touched.message && errors.message && (
                        <span className="input-error-message">{errors.message}</span>
                      )}
                    </div>
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      <FiSend size={16} />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
