import { motion } from 'motion/react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { Home as HomeIcon } from 'lucide-react';

export function NotFound() {
  return (
    <Section className="min-h-[80vh] flex items-center">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-8xl md:text-9xl mb-6 bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-4xl md:text-5xl mb-6 text-[#F5F5F5]">
            Page Not Found
          </h1>
          <p className="text-xl text-[#F5F5F5]/60 mb-8">
            Looks like you've ventured into uncharted territory.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
