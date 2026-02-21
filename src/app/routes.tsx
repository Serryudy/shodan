import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Solutions } from './pages/Solutions';
import { SolutionsAI } from './pages/SolutionsAI';
import { SolutionsSoftware } from './pages/SolutionsSoftware';
import { SolutionsAutomation } from './pages/SolutionsAutomation';
import { Lab } from './pages/Lab';
import { OpenSource } from './pages/OpenSource';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'solutions', Component: Solutions },
      { path: 'solutions/ai', Component: SolutionsAI },
      { path: 'solutions/software', Component: SolutionsSoftware },
      { path: 'solutions/automation', Component: SolutionsAutomation },
      { path: 'lab', Component: Lab },
      { path: 'open-source', Component: OpenSource },
      { path: 'blog', Component: Blog },
      { path: 'blog/:slug', Component: BlogPost },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);