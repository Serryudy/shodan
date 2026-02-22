import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Mail, MessageCircle, MapPin, CheckCircle, Send, Clock, Github, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import { useState } from 'react';

const PROJECT_TYPES = [
  'AI / Machine Learning',
  'Custom Software',
  'Automation & Integrations',
  'Open Source Collaboration',
  'Something Else',
];

const QUICK_LINKS = [
  { label: 'Solutions', path: '/solutions' },
  { label: 'Lab', path: '/lab' },
  { label: 'Open Source', path: '/open-source' },
  { label: 'Blog', path: '/blog' },
];

const FAQ = [
  {
    q: 'How quickly do you respond?',
    a: 'We aim to reply within 24 hours on weekdays. For urgent needs, hop into our Discord for a faster response.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Absolutely. Some of our best work has come from zero-to-one builds. Tell us your vision.',
  },
  {
    q: 'Can I contribute to your open-source projects?',
      a: "Yes! Head over to Open Source to see what's looking for contributors.",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[40vh] flex items-center" animate={false}>
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Let's Build Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed">
              Have a project in mind? Tell us about it — we read every message.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Contact Form & Info */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-[#F5F5F5]">
                Let's Build Something Meaningful.
              </h2>
              <p className="text-lg text-[#F5F5F5]/60 leading-relaxed">
                Whether you need AI systems, custom software, or automation tools,
                we're here to help. Share your vision and we'll make it happen.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20 border border-[#FF6A00]/30 shrink-0">
                  <Mail className="w-6 h-6 text-[#FF6A00]" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1 text-[#F5F5F5]">Email</h3>
                  <a href="mailto:hello@shodan.dev" className="text-[#F5F5F5]/60 hover:text-[#00B3B3] transition-colors">
                    hello@shodan.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20 border border-[#00B3B3]/30 shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#00B3B3]" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1 text-[#F5F5F5]">Discord Community</h3>
                  <a
                    href="https://discord.gg/placeholder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5F5]/60 hover:text-[#00B3B3] transition-colors"
                  >
                    discord.gg/build — 12,000+ members
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20 border border-[#FF6A00]/30 shrink-0">
                  <Github className="w-6 h-6 text-[#FF6A00]" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1 text-[#F5F5F5]">GitHub</h3>
                  <a
                    href="https://github.com/placeholder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5F5]/60 hover:text-[#00B3B3] transition-colors"
                  >
                    github.com/build-dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20 border border-[#00B3B3]/30 shrink-0">
                  <MapPin className="w-6 h-6 text-[#00B3B3]" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1 text-[#F5F5F5]">Location</h3>
                  <p className="text-[#F5F5F5]/60">
                    San Francisco, CA &nbsp;·&nbsp; Remote-first team
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20 border border-[#FF6A00]/30 shrink-0">
                  <Clock className="w-6 h-6 text-[#FF6A00]" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1 text-[#F5F5F5]">Response Time</h3>
                  <p className="text-[#F5F5F5]/60">Typically within 24 hours on weekdays</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2">
              <h3 className="text-base font-medium mb-3 text-[#F5F5F5]">Quick Links</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/70 text-sm hover:border-[#00B3B3]/50 hover:text-[#F5F5F5] hover:bg-[#00B3B3]/10 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[480px] rounded-2xl border border-[#00B3B3]/30 bg-gradient-to-br from-[#00B3B3]/10 to-[#FF6A00]/5 px-8 py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00B3B3]/30 to-[#FF6A00]/20 border border-[#00B3B3]/50 flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-[#00B3B3]" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl mb-3 text-[#F5F5F5]">Message Sent!</h3>
                  <p className="text-[#F5F5F5]/60 mb-8 leading-relaxed max-w-sm">
                    Thanks, <span className="text-[#FF6A00]">{formData.name || 'friend'}</span>! We'll be in touch within 24 hours.
                    In the meantime, come say hi in our Discord.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a
                      href="https://discord.gg/placeholder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#F5F5F5]/80 hover:bg-[#5865F2]/30 hover:text-[#F5F5F5] transition-all duration-200 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Join Discord
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', projectType: '', message: '' });
                      }}
                      className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F5F5F5]/60 hover:bg-white/10 hover:text-[#F5F5F5] transition-all duration-200 text-sm"
                    >
                      Send another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 text-[#F5F5F5]/80">
                        Name <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/30 focus:outline-none focus:border-[#00B3B3]/50 focus:bg-white/[0.07] transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-[#F5F5F5]/80">
                        Email <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/30 focus:outline-none focus:border-[#00B3B3]/50 focus:bg-white/[0.07] transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm mb-2 text-[#F5F5F5]/80">
                      What are you building?
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] focus:outline-none focus:border-[#00B3B3]/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1a1a1a] text-[#F5F5F5]/50">Select a category...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#1a1a1a] text-[#F5F5F5]">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-2 text-[#F5F5F5]/80">
                      Message <span className="text-[#FF6A00]">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder:text-[#F5F5F5]/30 focus:outline-none focus:border-[#00B3B3]/50 focus:bg-white/[0.07] transition-all resize-none"
                      placeholder="Tell us about your project, idea, or question..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-[#F5F5F5]/30 text-center">
                    No spam. We respond within 24 hours on weekdays.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="darker">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5]">Common Questions</h2>
            <p className="text-[#F5F5F5]/60">Quick answers before you hit send.</p>
          </div>

          <StaggerContainer className="space-y-4">
            {FAQ.map((item, i) => (
              <StaggerItem
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#FF6A00]/30 transition-colors duration-300 p-6"
              >
                <h3 className="text-base font-medium text-[#F5F5F5] mb-2 flex items-start gap-2">
                  <span className="text-[#FF6A00] mt-0.5">Q.</span>
                  {item.q}
                </h3>
                <p className="text-[#F5F5F5]/60 text-sm leading-relaxed pl-6">{item.a}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#F5F5F5]">
            Not sure where to start?
          </h2>
          <p className="text-lg text-[#F5F5F5]/60 mb-8">
            Explore our solutions, browse the lab, or jump straight into the community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/solutions">
              <Button variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  View Solutions <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            <Link to="/lab">
              <Button variant="ghost" size="lg">
                Visit the Lab
              </Button>
            </Link>
            <Link to="/open-source">
              <Button variant="ghost" size="lg">
                Open Source
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
