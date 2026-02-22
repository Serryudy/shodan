/**
 * blogService.ts — Firestore CRUD for blog posts
 *
 * Collection: "articles"
 * Order: by createdAt desc (newest first)
 */
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteField,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPostSection {
  heading: string;
  body: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  /** Short teaser shown on the listing card */
  excerpt: string;
  author: string;
  /** Human-readable date string, e.g. "Feb 15, 2026" */
  date: string;
  readTime: string;
  category: string;
  /** URL-safe identifier */
  slug: string;
  likes: number;
  comments: number;
  // ── Detail page specific ───────────────────────────────────────────────────
  /** Author's job title */
  role?: string;
  /** Lede / intro paragraph */
  intro?: string;
  /** Structured content with headings (legacy seeded posts) */
  sections?: BlogPostSection[];
  /** Plain-text body (new posts written via the write UI) */
  content?: string;
  tags?: string[];
  /** Firebase Storage download URL for the cover / thumbnail image */
  coverUrl?: string;
  /** Firestore server timestamp — used for ordering */
  createdAt?: Timestamp;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function assertDb(): NonNullable<typeof db> {
  if (!db) throw new Error('Firebase is not configured. Fill in .env with your VITE_FIREBASE_* keys.');
  return db;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch all posts ordered by newest first.
 * Returns [] if Firebase is not configured (graceful degradation).
 */
export async function fetchPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured) return [];
  const col = collection(assertDb(), 'articles');
  const q = query(col, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<BlogPost, 'id'>) }));
}

/**
 * Fetch a single post by its URL slug.
 * Returns null if not found or Firebase isn't configured.
 */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isFirebaseConfigured) return null;
  const col = collection(assertDb(), 'articles');
  const q = query(col, where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as Omit<BlogPost, 'id'>) };
}

/**
 * Save a new post to Firestore.
 * Returns the new document ID.
 */
export async function createPost(
  post: Omit<BlogPost, 'id' | 'createdAt'>,
): Promise<string> {
  const ref = await addDoc(collection(assertDb(), 'articles'), {
    ...post,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Update an existing post by its Firestore document ID.
 * Pass `sections: deleteField()` (re-exported below) to remove the legacy field.
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>,
): Promise<void> {
  await updateDoc(doc(assertDb(), 'articles', id), updates);
}

/** Re-export so callers can pass deleteField() for fields they want removed. */
export { deleteField };

/**
 * Compress an image File to a base64 JPEG data URL using canvas.
 * Resizes to maxWidth (default 1200px) at the given JPEG quality (default 0.82).
 * The result can be stored directly as a Firestore string field and used in <img src={...}>.
 */
export function compressImageToDataUrl(
  file: File,
  maxWidth = 1200,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Image load failed')); };
    img.src = objectUrl;
  });
}
