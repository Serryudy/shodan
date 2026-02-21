import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Target, Lightbulb, Heart, Users, Linkedin } from 'lucide-react';
import { StaggerGrid, StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export function About() {
  const timeline = [
    { year: '2023', title: 'The Beginning', description: 'Started with a vision to democratize AI and software development.' },
    { year: '2024', title: 'First Products', description: 'Launched our core AI systems and automation frameworks.' },
    { year: '2025', title: 'Open Source', description: 'Released major tools to the open-source community.' },
    { year: '2026', title: 'The Lab', description: 'Opened our experimental lab for public collaboration.' },
  ];

  const team = [
    {
      name: 'Pabasara Fernando',
      role: 'CEO & Founder · Project Management',
      color: 'from-[#FF6A00] to-[#00B3B3]',
      bio: 'Visionary founder and project manager driving the mission to build powerful, open tools that put creators and developers in control.',
      linkedin: 'https://www.linkedin.com/in/pabasara-fernando-a27164293/',
      photo: '/team/pabasara.jpg',
    },
    {
      name: 'Nimesh Madhusankaka',
      role: 'Software Engineer & Co-founder',
      color: 'from-[#00B3B3] to-[#FF6A00]',
      bio: 'Co-founder and engineer building the core architecture and intelligent systems behind our products.',
      linkedin: 'https://www.linkedin.com/in/nimeshmadhusankaka/',
      photo: '/team/nimesh.jpg',
    },
    {
      name: 'Avishka Vishmitha',
      role: 'Tech Lead · Business Analyst',
      color: 'from-[#FF6A00] to-purple-500',
      bio: 'Tech lead and business analyst bridging technical execution with strategic product decisions across all platforms.',
      linkedin: 'https://www.linkedin.com/in/avishka-vishmitha/',
      photo: '/team/avishka.jpg',
    },
    {
      name: 'Madeesha Karunarathna',
      role: 'Senior Software Engineer',
      color: 'from-purple-500 to-[#00B3B3]',
      bio: 'Experienced software engineer who architects robust systems and drives technical excellence across the team.',
      linkedin: 'https://www.linkedin.com/in/madeesha-karunarathna/',
      photo: '/team/madeesha.jpg',
    },
    {
      name: 'Indunil Asela',
      role: 'Software Engineer',
      color: 'from-green-500 to-[#00B3B3]',
      bio: 'Full-stack engineer building seamless experiences across our AI and creative tools.',
      linkedin: 'https://www.linkedin.com/in/indunil-asela/',
      photo: '/team/indunil.jpg',
    },
    {
      name: 'Kasun Shakthi',
      role: 'Backend Engineer',
      color: 'from-[#FF6A00] to-purple-500',
      bio: 'Systems thinker and backend specialist, building the robust infrastructure that powers our AI platforms.',
      linkedin: 'https://www.linkedin.com/in/kasun-shakthi-a6327439a/',
      photo: '/team/kasun.jpg',
    },
    {
      name: 'Dulara Mihiran',
      role: 'Frontend Developer',
      color: 'from-[#00B3B3] to-green-500',
      bio: 'Crafts beautiful, performant interfaces that make powerful AI tools feel approachable and intuitive.',
      linkedin: 'https://www.linkedin.com/in/dulara-mihiran-a1a7b7270/',
      photo: '/team/dulara.jpg',
    },
    {
      name: 'Chalindu Shehal',
      role: 'Cyber Security Engineer',
      color: 'from-red-500 to-[#FF6A00]',
      bio: 'Security-first engineer safeguarding our products, infrastructure, and users against threats across every layer of the stack.',
      linkedin: 'https://www.linkedin.com/in/chalindu-shehal/',
      photo: '/team/chalindu.jpg',
    },
    {
      name: 'Lakshan Rajapaksha',
      role: 'DevOps & Cloud Engineer',
      color: 'from-[#00B3B3] to-green-500',
      bio: 'Automates everything and ensures our AI infrastructure scales reliably across global deployments.',
      linkedin: 'https://www.linkedin.com/in/lakshan-rajapaksha01/',
      photo: '/team/lakshan.jpg',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center" animate={false}>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block text-[#F5F5F5]">Technology Should</span>
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Empower, Not Overwhelm.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed">
              We're a team of builders, dreamers, and open-source advocates creating tools that matter.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Story Section */}
      <Section background="gradient">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-[#F5F5F5]">Our Story</h2>
            <div className="space-y-4 text-lg text-[#F5F5F5]/70 leading-relaxed">
              <p>
                We started BUILD because we were tired of bloated enterprise software, 
                closed ecosystems, and tools that treated developers like customers instead of creators.
              </p>
              <p>
                We believe the future belongs to independent builders, small teams with big ideas, 
                and communities that collaborate in the open.
              </p>
              <p>
                Every line of code we write, every product we ship, and every experiment we run 
                is guided by one principle: make technology accessible, powerful, and beautiful.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <GlowCard glowColor="orange" className="text-center">
              <div className="text-4xl mb-2 text-[#FF6A00]">50K+</div>
              <div className="text-sm text-[#F5F5F5]/60">Developers</div>
            </GlowCard>
            <GlowCard glowColor="teal" className="text-center">
              <div className="text-4xl mb-2 text-[#00B3B3]">100+</div>
              <div className="text-sm text-[#F5F5F5]/60">Open Source Projects</div>
            </GlowCard>
            <GlowCard glowColor="teal" className="text-center">
              <div className="text-4xl mb-2 text-[#00B3B3]">1.5M</div>
              <div className="text-sm text-[#F5F5F5]/60">GitHub Stars</div>
            </GlowCard>
            <GlowCard glowColor="orange" className="text-center">
              <div className="text-4xl mb-2 text-[#FF6A00]">40+</div>
              <div className="text-sm text-[#F5F5F5]/60">Countries</div>
            </GlowCard>
          </motion.div>
        </div>
      </Section>

      {/* Values Section */}
      <Section>
        <SectionHeader
          title="Our Values"
          subtitle="The principles that guide everything we build."
          centered
        />

        <StaggerGrid cols={4}>
          <GlowCard className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20">
                <Target className="w-8 h-8 text-[#FF6A00]" />
              </div>
            </div>
            <h3 className="text-xl mb-3 text-[#F5F5F5]">Purpose-Driven</h3>
            <p className="text-[#F5F5F5]/60 text-sm">
              Every feature has a reason. Every line of code serves a purpose.
            </p>
          </GlowCard>

          <GlowCard className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20">
                <Lightbulb className="w-8 h-8 text-[#00B3B3]" />
              </div>
            </div>
            <h3 className="text-xl mb-3 text-[#F5F5F5]">Innovation First</h3>
            <p className="text-[#F5F5F5]/60 text-sm">
              We experiment, we fail fast, and we push boundaries.
            </p>
          </GlowCard>

          <GlowCard className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-[#00B3B3]/20">
                <Heart className="w-8 h-8 text-[#FF6A00]" />
              </div>
            </div>
            <h3 className="text-xl mb-3 text-[#F5F5F5]">Community Over Profit</h3>
            <p className="text-[#F5F5F5]/60 text-sm">
              Our success is measured by the impact we have on builders.
            </p>
          </GlowCard>

          <GlowCard className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#00B3B3]/20 to-[#FF6A00]/20">
                <Users className="w-8 h-8 text-[#00B3B3]" />
              </div>
            </div>
            <h3 className="text-xl mb-3 text-[#F5F5F5]">Radical Transparency</h3>
            <p className="text-[#F5F5F5]/60 text-sm">
              We build in public, share our learnings, and stay open.
            </p>
          </GlowCard>
        </StaggerGrid>
      </Section>

      {/* Timeline Section */}
      <Section background="darker">
        <SectionHeader title="Our Journey" centered />

        <StaggerContainer className="max-w-4xl mx-auto">
          {timeline.map((item) => (
            <StaggerItem
              key={item.year}
              className="relative pl-8 pb-12 border-l-2 border-[#00B3B3]/30 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#FF6A00] border-4 border-[#0D0D0D]" />
              <div className="text-[#00B3B3] mb-2">{item.year}</div>
              <h3 className="text-2xl mb-2 text-[#F5F5F5]">{item.title}</h3>
              <p className="text-[#F5F5F5]/60">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Team Section */}
      <Section>
        <SectionHeader
          title="Meet the Team"
          subtitle="The humans behind the code."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.09 }}
            >
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="block h-full">
            <GlowCard className="text-center group h-full cursor-pointer">
                <div className="flex justify-center mb-5">
                  <div className={`w-20 h-20 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform bg-gradient-to-br ${member.color}`}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const parent = img.parentElement;
                        if (parent && !parent.querySelector('span')) {
                          const span = document.createElement('span');
                          span.className = 'flex items-center justify-center w-full h-full text-3xl text-[#0D0D0D] font-bold';
                          span.textContent = member.name.charAt(0);
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-xl mb-1 text-[#F5F5F5]">{member.name}</h3>
                <p className="text-[#FF6A00] text-sm mb-3">{member.role}</p>
                <p className="text-[#F5F5F5]/60 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-[#F5F5F5]/40 hover:text-[#00B3B3] hover:bg-white/10 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </GlowCard>
            </a>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Section background="darker">
        <SectionHeader
          title="We're Hiring"
          subtitle="Come build the future with us. Fully remote, great pay, amazing team."
          centered
        />
        <StaggerContainer className="max-w-3xl mx-auto space-y-4">
          {[
            { role: 'Senior ML Engineer', team: 'AI', type: 'Full-time · Remote' },
            { role: 'Developer Advocate', team: 'Community', type: 'Full-time · Remote' },
            { role: 'Staff Backend Engineer', team: 'Platform', type: 'Full-time · Remote' },
            { role: 'Product Designer', team: 'Design', type: 'Full-time · Remote' },
          ].map((job) => (
            <StaggerItem key={job.role}>
              <Link to="/contact">
                <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF6A00]/40 hover:bg-white/[0.07] transition-all group cursor-pointer">
                  <div>
                    <h3 className="text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors">{job.role}</h3>
                    <p className="text-sm text-[#F5F5F5]/50 mt-1">{job.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-[#00B3B3]/20 text-[#00B3B3] border border-[#00B3B3]/30">
                      {job.team}
                    </span>
                    <span className="text-[#F5F5F5]/30 group-hover:text-[#FF6A00] group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Want to join the mission?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            We're always looking for talented builders who share our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/open-source">
              <Button variant="secondary" size="lg">
                Contribute Instead
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
