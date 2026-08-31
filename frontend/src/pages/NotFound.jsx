import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ParticleNetwork from '../components/ParticleNetwork.jsx';
import { Button } from '../components/ui/Button.jsx';

// Relatable exam & student life quotes/excuses pool
const EXCUSES = [
  {
    title: "OUT OF SYLLABUS!",
    quote: "This question was deleted from the 2026 syllabus, but NTA somehow printed it in your question booklet anyway.",
    tip: "Marks to all candidates? Sadly, no.",
  },
  {
    title: "THE SHARMA JI PHENOMENON",
    quote: "Even Sharma ji ka beta with AIR 1 couldn't find this webpage.",
    tip: "He's already moved on to solving Irodov though.",
  },
  {
    title: "DERIVATION GONE WRONG",
    quote: "We attempted to integrate by parts, divided by zero at step 4, and ended up in this blank dimension.",
    tip: "Check your integration constants (+C) next time.",
  },
  {
    title: "NEGATIVE MARKING APPLIED",
    quote: "You guessed the URL instead of leaving it unattempted. Penalty: -1 rank point.",
    tip: "Accurate navigation > blind guessing.",
  },
  {
    title: "DOG ATE THE ROUTE TABLE",
    quote: "The server says it studied this chapter for 14 hours yesterday, yet completely blanked out during the test.",
    tip: "Spaced repetition works better than cramming.",
  },
  {
    title: "SCHRÖDINGER'S WEBPAGE",
    quote: "Until you refreshed the page, this URL was simultaneously published and nonexistent. You collapsed the wave function into a 404.",
    tip: "Quantum physics strikes again.",
  },
];

// Quick searchable courses and topics
const SEARCHABLE_TOPICS = [
  { name: 'JEE Main & Advanced 2026', tag: 'Engineering', link: '/#courses', badge: 'High Yield' },
  { name: 'NEET Ultimate Prep 2026', tag: 'Medical', link: '/#courses', badge: 'Top Rated' },
  { name: 'Class 11 & 12 Boards + Competitive', tag: 'Academics', link: '/#courses', badge: 'Foundation' },
  { name: 'Govt. Job & SSC Banking Batch', tag: 'Govt. Exams', link: '/#courses', badge: 'Popular' },
  { name: 'Rotational Dynamics & Mechanics', tag: 'Physics', link: '/#courses', badge: 'Concept' },
  { name: 'Organic Chemistry Mechanisms', tag: 'Chemistry', link: '/#courses', badge: 'Must Watch' },
  { name: 'Calculus & Vectors Mastery', tag: 'Mathematics', link: '/#courses', badge: 'Rank Booster' },
  { name: 'Human Physiology & Genetics', tag: 'Biology', link: '/#courses', badge: 'High Weightage' },
];

// Falling items for the Rank Saver Mini-Game
const GAME_ITEMS = [
  { text: '📚 +10', type: 'good', points: 10, label: 'NCERT Revision' },
  { text: '⚡ +15', type: 'good', points: 15, label: 'PYQ Solved' },
  { text: '🎯 +20', type: 'good', points: 20, label: 'Mock Test AIR 1' },
  { text: '🧠 +25', type: 'good', points: 25, label: 'Formula Sheet' },
  { text: '📱 -10', type: 'bad', points: -10, label: 'Reels Distraction' },
  { text: '⚠️ -15', type: 'bad', points: -15, label: 'Negative Marking' },
  { text: '😴 -20', type: 'bad', points: -20, label: 'Slept Through Class' },
];

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic excuse state
  const [excuseIndex, setExcuseIndex] = useState(() => Math.floor(Math.random() * EXCUSES.length));
  const [isRolling, setIsRolling] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Mini-game state
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameHighScore, setGameHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('strivers_404_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [gameTimeLeft, setGameTimeLeft] = useState(20);
  const [activeItems, setActiveItems] = useState([]);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100
  const [gameFeedback, setGameFeedback] = useState(null);
  const gameAreaRef = useRef(null);

  // Roll next excuse with quick spring animation
  const handleRollExcuse = () => {
    setIsRolling(true);
    setTimeout(() => {
      setExcuseIndex((prev) => (prev + 1) % EXCUSES.length);
      setIsRolling(false);
    }, 200);
  };

  // Copy current URL helper
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  // Filtered search results
  const filteredTopics = searchQuery.trim() === ''
    ? []
    : SEARCHABLE_TOPICS.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Start mini game
  const startGame = () => {
    setGameActive(true);
    setGameScore(0);
    setGameTimeLeft(20);
    setActiveItems([]);
    setGameFeedback(null);
  };

  // Game timer loop
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          setGameFeedback('Time up! Rank Saved! 🎓');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Update high score on score change
  useEffect(() => {
    if (gameScore > gameHighScore) {
      setGameHighScore(gameScore);
      try {
        localStorage.setItem('strivers_404_highscore', gameScore.toString());
      } catch {
        // ignore
      }
    }
  }, [gameScore, gameHighScore]);

  // Item spawner loop
  useEffect(() => {
    if (!gameActive) return;

    const spawner = setInterval(() => {
      const template = GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
      const newItem = {
        id: Math.random(),
        ...template,
        x: Math.floor(Math.random() * 85) + 5, // 5% to 90%
        y: 0,
      };
      setActiveItems((prev) => [...prev.slice(-12), newItem]);
    }, 800);

    return () => clearInterval(spawner);
  }, [gameActive]);

  // Item physics / fall loop
  useEffect(() => {
    if (!gameActive) return;

    const fallInterval = setInterval(() => {
      setActiveItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 4 }))
          .filter((item) => item.y <= 95)
      );
    }, 50);

    return () => clearInterval(fallInterval);
  }, [gameActive]);

  // Player controls & Collision detection
  const handleItemCatch = useCallback((item) => {
    setGameScore((prev) => Math.max(0, prev + item.points));
    setActiveItems((prev) => prev.filter((i) => i.id !== item.id));
    setGameFeedback(`${item.label} (${item.points > 0 ? '+' : ''}${item.points})`);
    setTimeout(() => setGameFeedback(null), 1000);
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    activeItems.forEach((item) => {
      // Check if item is in collision zone near player bucket (y between 75 and 90, x near playerX)
      if (item.y >= 75 && item.y <= 90) {
        const distance = Math.abs(item.x - playerX);
        if (distance < 14) {
          handleItemCatch(item);
        }
      }
    });
  }, [activeItems, playerX, gameActive, handleItemCatch]);

  // Mouse / Touch movement for player
  const handleMouseMove = (e) => {
    if (!gameAreaRef.current || !gameActive) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, relativeX)));
  };

  const handleTouchMove = (e) => {
    if (!gameAreaRef.current || !gameActive || !e.touches[0]) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, relativeX)));
  };

  const currentExcuse = EXCUSES[excuseIndex];

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ParticleNetwork density={18000} fixed={true} />
      <Navbar />

      <main style={{ flex: 1, paddingTop: '7rem', paddingBottom: '5rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          
          {/* Main Error Hero Section */}
          <div style={{
            background: '#ffffff',
            border: '4px solid var(--color-ink)',
            boxShadow: 'var(--shadow-brutal)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Caution banner tape */}
            <div style={{
              position: 'absolute',
              top: '22px',
              right: '-60px',
              background: 'var(--color-yellow)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              padding: '0.4rem 4.5rem',
              border: '2px solid var(--color-ink)',
              transform: 'rotate(45deg)',
              boxShadow: '2px 2px 0px var(--color-ink)',
              userSelect: 'none',
              zIndex: 5
            }}>
              WARNING: 404
            </div>

            {/* Top Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{
                background: 'var(--color-accent)',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.35rem 0.75rem',
                border: '2px solid var(--color-ink)',
                boxShadow: '2px 2px 0px var(--color-ink)'
              }}>
                HTTP 404 — SYLLABUS MISMATCH
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-ink-muted)',
                fontWeight: 600
              }}>
                Requested Route: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '0.2rem 0.5rem', border: '1px solid var(--color-ink)', fontWeight: 700 }}>{location.pathname}</code>
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              
              {/* Left Column: Huge 404 Display & Typography */}
              <div>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                  <motion.h1
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(5rem, 15vw, 9rem)',
                      fontWeight: 900,
                      lineHeight: 0.85,
                      letterSpacing: '-0.06em',
                      color: 'var(--color-ink)',
                      margin: 0,
                      textShadow: '6px 6px 0px var(--color-yellow), 12px 12px 0px var(--color-ink)'
                    }}
                  >
                    404
                  </motion.h1>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: 'var(--color-ink)',
                  marginBottom: '1rem'
                }}>
                  Looks like this concept isn't in your syllabus.
                </h2>

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: 'var(--color-ink-muted)',
                  marginBottom: '2rem',
                  maxWidth: '48ch'
                }}>
                  The URL you attempted to reach has vanished, moved, or never existed in the curriculum. Don't worry—zero negative marks were deducted from your rank today!
                </p>

                {/* Primary Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    onClick={() => navigate('/')}
                    variant="primary"
                    id="404-return-home-btn"
                    style={{
                      border: '3px solid var(--color-ink)',
                      boxShadow: '4px 4px 0px var(--color-ink)',
                      padding: '0.8rem 1.6rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    Return to Homepage 🏠
                  </Button>

                  <Button
                    onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
                    variant="ghost"
                    id="404-previous-btn"
                    style={{
                      border: '3px solid var(--color-ink)',
                      background: 'var(--color-paper)',
                      boxShadow: '4px 4px 0px var(--color-ink)',
                      padding: '0.8rem 1.4rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    ← Previous Page
                  </Button>

                  <button
                    onClick={handleCopyUrl}
                    style={{
                      background: copiedUrl ? 'var(--color-yellow)' : '#ffffff',
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      padding: '0.8rem 1.2rem',
                      border: '3px solid var(--color-ink)',
                      boxShadow: '4px 4px 0px var(--color-ink)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {copiedUrl ? '✓ URL Copied to Clipboard!' : '📋 Copy Broken URL'}
                  </button>
                </div>
              </div>

              {/* Right Column: Dynamic Student Excuse / Exam Roast Card */}
              <div>
                <div style={{
                  background: 'var(--color-paper)',
                  border: '3px solid var(--color-ink)',
                  boxShadow: '6px 6px 0px var(--color-ink)',
                  padding: '1.75rem',
                  position: 'relative'
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px dashed var(--color-ink)', paddingBottom: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)'
                    }}>
                      EXAM BOARD EXCUSE FILE
                    </span>

                    <button
                      onClick={handleRollExcuse}
                      disabled={isRolling}
                      style={{
                        background: 'var(--color-yellow)',
                        border: '2px solid var(--color-ink)',
                        boxShadow: '2px 2px 0px var(--color-ink)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.35rem 0.75rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transform: isRolling ? 'scale(0.95)' : 'none',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      🎲 Roll Another Excuse
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={excuseIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase'
                      }}>
                        {currentExcuse.title}
                      </h3>

                      <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: 1.5,
                        color: 'var(--color-ink)',
                        marginBottom: '1.25rem'
                      }}>
                        "{currentExcuse.quote}"
                      </p>

                      <div style={{
                        background: '#ffffff',
                        border: '2px solid var(--color-ink)',
                        padding: '0.6rem 0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1rem' }}>💡</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
                          <strong>Faculty Note:</strong> {currentExcuse.tip}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Formula Easter Egg Doodle */}
                  <div style={{
                    marginTop: '1.25rem',
                    paddingTop: '0.75rem',
                    borderTop: '2px dashed var(--color-ink)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--color-ink-faint)',
                    fontFamily: 'var(--font-sans)'
                  }}>
                    <span>Rank Booster #404</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-accent)' }}>
                      \lim_(URL \to 0) Page = \emptyset
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Feature Grid: Mini Game & Course Search */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            
            {/* Left Card: "Rank Saver" Interactive Mini-Game */}
            <div style={{
              background: '#ffffff',
              border: '4px solid var(--color-ink)',
              boxShadow: 'var(--shadow-brutal)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '3px solid var(--color-ink)', paddingBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                    🎮 Rank Saver Mini-Game
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-ink-muted)', margin: '0.2rem 0 0' }}>
                    Catch formulas & PYQs, avoid negative marking!
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                    High Score: {gameHighScore}
                  </span>
                </div>
              </div>

              {/* Game Viewport Container */}
              <div
                ref={gameAreaRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                style={{
                  height: '240px',
                  background: 'var(--color-paper)',
                  border: '3px solid var(--color-ink)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: gameActive ? 'ew-resize' : 'default',
                  userSelect: 'none',
                  touchAction: 'none'
                }}
              >
                {!gameActive ? (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'rgba(255,243,226,0.85)'
                  }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
                      Need a 20-second study break before heading back?
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginBottom: '1.25rem' }}>
                      Drag your bucket to collect +Marks and dodge distractions!
                    </p>
                    <button
                      onClick={startGame}
                      style={{
                        background: 'var(--color-accent)',
                        color: '#ffffff',
                        border: '3px solid var(--color-ink)',
                        boxShadow: '3px 3px 0px var(--color-ink)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        padding: '0.6rem 1.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      {gameFeedback ? 'Play Again 🔄' : 'Start Mini-Game 🚀'}
                    </button>
                    {gameFeedback && (
                      <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--color-accent)', fontSize: '0.85rem' }}>
                        {gameFeedback} Final Score: {gameScore}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* HUD */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '10px',
                      right: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}>
                      <span style={{ background: '#ffffff', border: '2px solid var(--color-ink)', padding: '0.2rem 0.5rem' }}>
                        Score: {gameScore}
                      </span>
                      <span style={{ background: gameTimeLeft <= 5 ? '#ff4d4d' : '#ffffff', color: gameTimeLeft <= 5 ? '#fff' : '#000', border: '2px solid var(--color-ink)', padding: '0.2rem 0.5rem' }}>
                        ⏳ {gameTimeLeft}s
                      </span>
                    </div>

                    {/* Feedback popup */}
                    {gameFeedback && (
                      <div style={{
                        position: 'absolute',
                        top: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--color-yellow)',
                        border: '2px solid var(--color-ink)',
                        padding: '0.2rem 0.6rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        zIndex: 15,
                        pointerEvents: 'none'
                      }}>
                        {gameFeedback}
                      </div>
                    )}

                    {/* Falling items */}
                    {activeItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          position: 'absolute',
                          left: `${item.x}%`,
                          top: `${item.y}%`,
                          transform: 'translate(-50%, -50%)',
                          background: item.type === 'good' ? 'var(--color-yellow)' : '#ff6b6b',
                          color: 'var(--color-ink)',
                          border: '2px solid var(--color-ink)',
                          padding: '0.2rem 0.45rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          boxShadow: '2px 2px 0px var(--color-ink)',
                          pointerEvents: 'none',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.text}
                      </div>
                    ))}

                    {/* Player Bucket */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${playerX}%`,
                        bottom: '10px',
                        transform: 'translateX(-50%)',
                        background: 'var(--color-secondary)',
                        color: 'var(--color-ink)',
                        border: '3px solid var(--color-ink)',
                        boxShadow: '2px 2px 0px var(--color-ink)',
                        padding: '0.4rem 0.9rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                    >
                      🎓 [ Striver Aspirant ]
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Card: Quick Subject & Course Finder */}
            <div style={{
              background: '#ffffff',
              border: '4px solid var(--color-ink)',
              boxShadow: 'var(--shadow-brutal)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '1rem', borderBottom: '3px solid var(--color-ink)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                  🔍 Find What You Were Looking For
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-ink-muted)', margin: '0.2rem 0 0' }}>
                  Search courses, topics, faculties, or high-yield series:
                </p>
              </div>

              {/* Search Bar Input */}
              <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. JEE, NEET, Calculus, Foundation, SSC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    padding: '0.75rem 1rem',
                    border: '3px solid var(--color-ink)',
                    background: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    fontWeight: 600,
                    outline: 'none',
                    boxShadow: '3px 3px 0px var(--color-ink)'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: '0.9rem'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Results / Recommended Topics */}
              <div style={{ flex: 1, maxHeight: '200px', overflowY: 'auto' }}>
                {searchQuery.trim() !== '' ? (
                  filteredTopics.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {filteredTopics.map((topic, i) => (
                        <a
                          key={i}
                          href={topic.link}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.6rem 0.8rem',
                            background: 'var(--color-paper)',
                            border: '2px solid var(--color-ink)',
                            textDecoration: 'none',
                            color: 'var(--color-ink)',
                            transition: 'background 0.15s ease'
                          }}
                        >
                          <div>
                            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem' }}>{topic.name}</span>
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: 'var(--color-ink-muted)' }}>({topic.tag})</span>
                          </div>
                          <span style={{
                            background: 'var(--color-yellow)',
                            border: '1px solid var(--color-ink)',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.4rem',
                            textTransform: 'uppercase'
                          }}>
                            {topic.badge}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                      No direct matches for "{searchQuery}". <br />
                      <a href="/#courses" style={{ color: 'var(--color-accent)', fontWeight: 700, textDecoration: 'underline' }}>
                        Browse all courses on the main page →
                      </a>
                    </div>
                  )
                ) : (
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ink-faint)', marginBottom: '0.5rem' }}>
                      Popular Destinations:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {SEARCHABLE_TOPICS.slice(0, 5).map((topic, i) => (
                        <a
                          key={i}
                          href={topic.link}
                          style={{
                            background: 'var(--color-paper)',
                            border: '2px solid var(--color-ink)',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 700,
                            color: 'var(--color-ink)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: '2px 2px 0px var(--color-ink)'
                          }}
                        >
                          <span>{topic.name}</span>
                          <span style={{ color: 'var(--color-accent)' }}>→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Fast Navigation Bar */}
          <div style={{
            background: 'var(--color-yellow)',
            border: '4px solid var(--color-ink)',
            boxShadow: 'var(--shadow-brutal)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', margin: 0, color: 'var(--color-ink)' }}>
                Need Help with Your Study Plan?
              </h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-ink)', margin: '0.2rem 0 0' }}>
                Join 50,000+ fellow aspirants on our active community channels.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://chat.whatsapp.com/K0QF19zbGP8ELy7tkClRyG?mode=gi_t"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffffff',
                  color: 'var(--color-ink)',
                  border: '2px solid var(--color-ink)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  boxShadow: '2px 2px 0px var(--color-ink)'
                }}
              >
                Join WhatsApp Group 💬
              </a>

              <a
                href="https://www.youtube.com/@Striverseducation"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'var(--color-ink)',
                  color: '#ffffff',
                  border: '2px solid var(--color-ink)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.5)'
                }}
              >
                Watch on YouTube 📺
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
