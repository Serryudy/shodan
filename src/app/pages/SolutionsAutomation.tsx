import { motion } from 'motion/react';
import { Section, SectionHeader } from '../components/Section';
import { GlowCard, FeatureCard } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Workflow, Zap, Repeat, Clock, CheckCircle, Settings, TrendingUp, BarChart3, Shield, Bot, LineChart, Coins } from 'lucide-react';
import { StaggerGrid, StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export function SolutionsAutomation() {
  return (
    <div>
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center" animate={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10">
              <TrendingUp className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-sm text-[#FF6A00]">Algorithmic Trading</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                Open Source Trading
              </span>
              <span className="block text-[#F5F5F5]">Powered by Algorithms</span>
            </h1>
            <p className="text-xl text-[#F5F5F5]/60 mb-8 leading-relaxed">
              An open-source algorithmic crypto trading platform built on the Binance API. Backtest, deploy, and monitor strategies with full transparency.
            </p>
            <a href="https://github.com/Serryudy/note-app" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                View on GitHub
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="relative h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#00B3B3]/20 to-[#FF6A00]/20 rounded-3xl blur-3xl" />
            <GlowCard className="relative z-10 h-full flex items-center justify-center">
              <TrendingUp className="w-32 h-32 text-[#FF6A00]" />
            </GlowCard>
          </motion.div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="gradient">
        <SectionHeader
          title="Platform Features"
          subtitle="Everything you need to build, test, and deploy trading strategies."
          centered
        />

        <StaggerGrid cols={3}>
          <FeatureCard
            icon={<Bot className="w-8 h-8 text-[#FF6A00]" />}
            title="Algorithm Builder"
            description="Design custom trading algorithms with a modular strategy framework."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-[#00B3B3]" />}
            title="Backtesting Engine"
            description="Test strategies against historical data before risking real capital."
          />
          <FeatureCard
            icon={<Coins className="w-8 h-8 text-[#FF6A00]" />}
            title="Binance API Integration"
            description="Direct integration with Binance for spot and futures trading."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-[#00B3B3]" />}
            title="Risk Management"
            description="Built-in stop-loss, position sizing, and portfolio risk controls."
          />
          <FeatureCard
            icon={<LineChart className="w-8 h-8 text-[#FF6A00]" />}
            title="Real-time Analytics"
            description="Live dashboards with P&L tracking, trade history, and performance metrics."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-[#00B3B3]" />}
            title="Low Latency Execution"
            description="Optimized order execution with WebSocket streams for minimal slippage."
          />
        </StaggerGrid>
      </Section>

      {/* Use Cases */}
      <Section>
        <SectionHeader title="Automation Use Cases" centered />
        
        <StaggerGrid cols={2} className="max-w-5xl mx-auto">
          {[
            {
              title: 'Data Processing',
              description: 'Automatically collect, process, and analyze data from multiple sources.',
              examples: ['ETL pipelines', 'Report generation', 'Data validation']
            },
            {
              title: 'Workflow Automation',
              description: 'Streamline business processes from start to finish.',
              examples: ['Approval workflows', 'Task assignment', 'Notifications']
            },
            {
              title: 'Integration \u0026 Sync',
              description: 'Keep your tools and data in sync automatically.',
              examples: ['CRM sync', 'Database updates', 'API integrations']
            },
            {
              title: 'Scheduled Tasks',
              description: 'Run tasks on a schedule without manual intervention.',
              examples: ['Backups', 'Reports', 'Maintenance jobs']
            },
          ].map((useCase) => (
            <GlowCard key={useCase.title}>
              <h3 className="text-2xl mb-3 text-[#F5F5F5]">{useCase.title}</h3>
              <p className="text-[#F5F5F5]/60 mb-4">{useCase.description}</p>
              <div className="space-y-2">
                {useCase.examples.map((example) => (
                  <div key={example} className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
                    <div className="w-1 h-1 rounded-full bg-[#00B3B3]" />
                    {example}
                  </div>
                ))}
              </div>
            </GlowCard>
          ))}
        </StaggerGrid>
      </Section>

      {/* How It Works */}
      <Section background="gradient">
        <SectionHeader title="How It Works" centered />
        
        <StaggerContainer className="max-w-4xl mx-auto space-y-6">
          {[
            { title: 'Configure', description: 'Set up your Binance API keys and choose your trading pairs.' },
            { title: 'Build Strategy', description: 'Select from built-in algorithms or code your own custom strategy.' },
            { title: 'Backtest', description: 'Run your strategy against historical market data to validate performance.' },
            { title: 'Deploy', description: 'Go live with paper trading or real funds — with risk controls in place.' },
            { title: 'Monitor', description: 'Track performance in real-time with detailed analytics and alerts.' },
          ].map((step, index) => (
            <StaggerItem key={step.title} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#00B3B3] flex items-center justify-center text-[#0D0D0D]">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl mb-2 text-[#F5F5F5]">{step.title}</h3>
                <p className="text-[#F5F5F5]/60">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Ready to trade algorithmically?
          </h2>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Open source, transparent, and community-driven. Start building your strategies today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/Serryudy/note-app" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                View on GitHub
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
