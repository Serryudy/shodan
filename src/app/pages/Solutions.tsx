import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Brain, Code2, Workflow, ArrowRight, CheckCircle, Sparkles, Zap, Camera, TrendingUp, Rocket } from 'lucide-react';
import { StaggerGrid, StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export function Solutions() {
  const solutions = [
    {
      icon: <Camera className="w-12 h-12" />,
      title: 'Creative Software',
      description: 'Professional camera and video tools built for creators and filmmakers.',
      color: 'orange',
      path: '/solutions/software',
      features: ['Helios Camera (Android)', 'Helios Studio (Color Grading)', 'RAW Processing', 'Video Encoding']
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'AI-Powered Tools',
      description: 'Intelligent systems that augment how you think, learn, and interact with your OS.',
      color: 'teal',
      path: '/solutions/ai',
      features: ['AI Note Taking', 'OS-Level Voice Agent', 'Knowledge Graphs', 'Arch Linux Integration']
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Open Platforms',
      description: 'Open-source algorithmic trading and community-driven tools.',
      color: 'both',
      path: '/solutions/automation',
      features: ['Crypto Trading Algorithms', 'Binance API Integration', 'Backtesting Engine', 'Real-time Analytics']
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
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10">
              <Rocket className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-sm text-[#FF6A00]">Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Powerful Solutions
              </span>
              <span className="block text-[#F5F5F5]">For Modern Builders</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5]/60 leading-relaxed">
              From professional camera apps to AI agents and algorithmic trading — we build the tools creators and developers need.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Solutions Grid */}
      <Section>
        <StaggerGrid cols={3}>
          {solutions.map((solution) => (
            <Link key={solution.title} to={solution.path}>
              <GlowCard glowColor={solution.color as any} className="h-full group cursor-pointer">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${
                    solution.color === 'orange' ? 'from-[#FF6A00]/20 to-[#FF6A00]/5 text-[#FF6A00]' :
                    solution.color === 'teal' ? 'from-[#00B3B3]/20 to-[#00B3B3]/5 text-[#00B3B3]' :
                    'from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/5 text-[#FF6A00]'
                  } inline-block mb-6`}>
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl mb-4 text-[#F5F5F5]">{solution.title}</h3>
                  <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">{solution.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
                        <CheckCircle className="w-4 h-4 text-[#00B3B3]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className={`${
                    solution.color === 'orange' ? 'text-[#FF6A00]' : 'text-[#00B3B3]'
                  } group-hover:translate-x-2 transition-transform inline-flex items-center gap-2`}>
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </GlowCard>
            </Link>
          ))}
        </StaggerGrid>
      </Section>

      {/* Process Section */}
      <Section background="gradient">
        <SectionHeader
          title="Our Process"
          subtitle="How we work with you to build exceptional solutions."
          centered
        />

        <StaggerGrid cols={4} className="max-w-5xl mx-auto">
          {[
            { step: '01', title: 'Discovery', description: 'We learn about your needs and goals' },
            { step: '02', title: 'Design', description: 'We craft the perfect solution' },
            { step: '03', title: 'Build', description: 'We develop with precision' },
            { step: '04', title: 'Launch', description: 'We deploy and support' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl mb-4 bg-gradient-to-r from-[#FF6A00] to-[#00B3B3] bg-clip-text text-transparent">
                {item.step}
              </div>
              <h3 className="text-xl mb-2 text-[#F5F5F5]">{item.title}</h3>
              <p className="text-[#F5F5F5]/60 text-sm">{item.description}</p>
            </div>
          ))}
        </StaggerGrid>
      </Section>

      {/* Pricing Section */}
      <Section background="darker">
        <SectionHeader
          title="Simple, Transparent Pricing"
          subtitle="Start for free. Scale as you grow. No hidden fees, ever."
          centered
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Community',
              price: 'Free',
              period: 'forever',
              description: 'Perfect for open-source projects and individual builders.',
              color: 'teal',
              features: [
                'All open-source tools',
                'Community Discord access',
                'Up to 3 projects',
                'Basic automation',
                'GitHub integration',
                'Community support',
              ],
              cta: 'Get Started Free',
              highlighted: false,
            },
            {
              name: 'Builder',
              price: '$49',
              period: 'per month',
              description: 'For teams shipping fast and iterating often.',
              color: 'orange',
              features: [
                'Everything in Community',
                'Unlimited projects',
                'Advanced AI features',
                'Priority support',
                'Custom integrations',
                'Team collaboration',
                'Analytics dashboard',
                'SLA guarantee',
              ],
              cta: 'Start Building',
              highlighted: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'per month',
              description: 'For organizations that need power, security, and scale.',
              color: 'teal',
              features: [
                'Everything in Builder',
                'Dedicated infrastructure',
                'SSO & advanced security',
                'Custom AI model training',
                'Dedicated success manager',
                'Custom SLAs',
                'On-premise option',
                'White-label available',
              ],
              cta: 'Talk to Sales',
              highlighted: false,
            },
          ].map((plan) => (
            <StaggerItem key={plan.name} className="relative">
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6A00] text-[#0D0D0D] text-xs rounded-full whitespace-nowrap z-10">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Most Popular
                </div>
              )}
              <GlowCard
                glowColor={plan.color as 'orange' | 'teal' | 'both'}
                className={`h-full flex flex-col ${plan.highlighted ? 'border-[#FF6A00]/40 bg-gradient-to-b from-[#FF6A00]/5 to-transparent' : ''}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl mb-2 text-[#F5F5F5]">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl ${plan.highlighted ? 'text-[#FF6A00]' : 'text-[#F5F5F5]'}`}>
                      {plan.price}
                    </span>
                    <span className="text-[#F5F5F5]/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-[#F5F5F5]/60 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-[#F5F5F5]/70">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-[#FF6A00]' : 'text-[#00B3B3]'}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to="/contact">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-center text-[#F5F5F5]/40 text-sm mt-12">
          All paid plans include a 14-day free trial. No credit card required.
        </p>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Ready to get started?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Let's discuss how we can help build your next big thing.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Start a Project
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
