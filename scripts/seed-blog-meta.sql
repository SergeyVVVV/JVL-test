-- Seed meta titles + descriptions for 29 blog articles missing them.
-- Run: mysql -u jvl -p jvl_dev < scripts/seed-blog-meta.sql

SET sql_mode = 'NO_BACKSLASH_ESCAPES';
SET @mt = 'App\Models\Page';

-- Helper: update if exists, insert if not
-- Wrapped in a transaction for safety
START TRANSACTION;

-- 1. are-arcade-games-good-for-your-brain
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Arcade Games Good for Your Brain? — JVL',
      m.description = 'Arcade games boost hand-eye coordination, reaction time, and spatial reasoning. See which game types offer the best proven cognitive benefits.'
  WHERE m.model_type = @mt AND p.slug = 'are-arcade-games-good-for-your-brain';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Arcade Games Good for Your Brain? — JVL',
    'Arcade games boost hand-eye coordination, reaction time, and spatial reasoning. See which game types offer the best proven cognitive benefits.'
  FROM pages p WHERE p.slug = 'are-arcade-games-good-for-your-brain'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 2. are-arcades-basically-gambling
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Arcades Basically Gambling? — JVL',
      m.description = 'Arcades are skill-based entertainment, not gambling. Learn the key legal and practical differences and why classic arcade games are legitimate fun.'
  WHERE m.model_type = @mt AND p.slug = 'are-arcades-basically-gambling';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Arcades Basically Gambling? — JVL',
    'Arcades are skill-based entertainment, not gambling. Learn the key legal and practical differences and why classic arcade games are legitimate fun.'
  FROM pages p WHERE p.slug = 'are-arcades-basically-gambling'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 3. are-arcades-dying-out
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Arcades Dying Out? — JVL',
      m.description = 'Traditional arcades have declined, but the industry is evolving. Discover how barcades, home machines, and premium venues are reshaping arcades.'
  WHERE m.model_type = @mt AND p.slug = 'are-arcades-dying-out';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Arcades Dying Out? — JVL',
    'Traditional arcades have declined, but the industry is evolving. Discover how barcades, home machines, and premium venues are reshaping arcades.'
  FROM pages p WHERE p.slug = 'are-arcades-dying-out'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 4. are-arcades-expensive-to-run
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Arcades Expensive to Run? — JVL',
      m.description = 'A commercial arcade costs $10,000–$50,000/month to run. Explore the key expenses, revenue benchmarks, and why a home arcade machine is a smarter buy.'
  WHERE m.model_type = @mt AND p.slug = 'are-arcades-expensive-to-run';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Arcades Expensive to Run? — JVL',
    'A commercial arcade costs $10,000–$50,000/month to run. Explore the key expenses, revenue benchmarks, and why a home arcade machine is a smarter buy.'
  FROM pages p WHERE p.slug = 'are-arcades-expensive-to-run'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 5. are-home-arcade-machines-worth-getting
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Home Arcade Machines Worth Getting? — JVL',
      m.description = 'Home arcade machines deliver years of entertainment with no subscriptions. See what makes a quality unit worth the investment for your home.'
  WHERE m.model_type = @mt AND p.slug = 'are-home-arcade-machines-worth-getting';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Home Arcade Machines Worth Getting? — JVL',
    'Home arcade machines deliver years of entertainment with no subscriptions. See what makes a quality unit worth the investment for your home.'
  FROM pages p WHERE p.slug = 'are-home-arcade-machines-worth-getting'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 6. can-i-add-games-to-an-arcade-machine
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Can I Add Games to an Arcade Machine? — JVL',
      m.description = 'Whether you can add games depends on machine type. Vintage cabinets are fixed; modern systems vary. Here''s what to know before you buy.'
  WHERE m.model_type = @mt AND p.slug = 'can-i-add-games-to-an-arcade-machine';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Can I Add Games to an Arcade Machine? — JVL',
    'Whether you can add games depends on machine type. Vintage cabinets are fixed; modern systems vary. Here''s what to know before you buy.'
  FROM pages p WHERE p.slug = 'can-i-add-games-to-an-arcade-machine'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 7. can-i-put-modern-games-on-an-arcade-cabinet
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Can I Put Modern Games on an Arcade Cabinet? — JVL',
      m.description = 'Modern games run on DIY builds, but commercial machines use locked systems for licensing compliance. Here''s what''s possible and what to consider.'
  WHERE m.model_type = @mt AND p.slug = 'can-i-put-modern-games-on-an-arcade-cabinet';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Can I Put Modern Games on an Arcade Cabinet? — JVL',
    'Modern games run on DIY builds, but commercial machines use locked systems for licensing compliance. Here''s what''s possible and what to consider.'
  FROM pages p WHERE p.slug = 'can-i-put-modern-games-on-an-arcade-cabinet'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 8. do-arcade-machines-use-a-lot-of-electricity
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Do Arcade Machines Use a Lot of Electricity? — JVL',
      m.description = 'Modern arcade machines use just 50–150 watts — similar to a laptop — costing $5–$15/month. Here''s a breakdown of what drives power consumption.'
  WHERE m.model_type = @mt AND p.slug = 'do-arcade-machines-use-a-lot-of-electricity';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Do Arcade Machines Use a Lot of Electricity? — JVL',
    'Modern arcade machines use just 50–150 watts — similar to a laptop — costing $5–$15/month. Here''s a breakdown of what drives power consumption.'
  FROM pages p WHERE p.slug = 'do-arcade-machines-use-a-lot-of-electricity'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 9. how-does-an-arcade-get-the-games-for-its-machines  (custom title — default >55 chars)
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How Arcades Get Their Games — JVL',
      m.description = 'Arcades get games through direct purchases, leasing, or revenue-share deals. Learn how each model works and what fits different venue types.'
  WHERE m.model_type = @mt AND p.slug = 'how-does-an-arcade-get-the-games-for-its-machines';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How Arcades Get Their Games — JVL',
    'Arcades get games through direct purchases, leasing, or revenue-share deals. Learn how each model works and what fits different venue types.'
  FROM pages p WHERE p.slug = 'how-does-an-arcade-get-the-games-for-its-machines'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 10. how-much-can-an-arcade-make-a-day
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How Much Can an Arcade Make a Day? — JVL',
      m.description = 'A single arcade machine earns $50–$300/day depending on location and game type. See how placement and machine selection impact your daily revenue.'
  WHERE m.model_type = @mt AND p.slug = 'how-much-can-an-arcade-make-a-day';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How Much Can an Arcade Make a Day? — JVL',
    'A single arcade machine earns $50–$300/day depending on location and game type. See how placement and machine selection impact your daily revenue.'
  FROM pages p WHERE p.slug = 'how-much-can-an-arcade-make-a-day'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 11. how-much-did-arcade-machines-cost
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How Much Did Arcade Machines Cost? — JVL',
      m.description = 'Classic arcade machines from the 1980s–90s cost $2,000–$5,000 new. See how golden-era pricing compares to today''s home arcade machines.'
  WHERE m.model_type = @mt AND p.slug = 'how-much-did-arcade-machines-cost';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How Much Did Arcade Machines Cost? — JVL',
    'Classic arcade machines from the 1980s–90s cost $2,000–$5,000 new. See how golden-era pricing compares to today''s home arcade machines.'
  FROM pages p WHERE p.slug = 'how-much-did-arcade-machines-cost'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 12. is-buying-vintage-arcade-video-game-machines-a-good-investment  (custom title)
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Are Vintage Arcade Machines a Good Buy? — JVL',
      m.description = 'Rare vintage arcade cabinets can appreciate 3–7% yearly, but most are risky. Here''s when buying vintage makes financial sense — and when it doesn''t.'
  WHERE m.model_type = @mt AND p.slug = 'is-buying-vintage-arcade-video-game-machines-a-good-investment';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Are Vintage Arcade Machines a Good Buy? — JVL',
    'Rare vintage arcade cabinets can appreciate 3–7% yearly, but most are risky. Here''s when buying vintage makes financial sense — and when it doesn''t.'
  FROM pages p WHERE p.slug = 'is-buying-vintage-arcade-video-game-machines-a-good-investment'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 13. touchscreen-vs-button-controls-which-arcade-style-is-right-for-you  (custom title)
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Touchscreen vs. Button Controls — JVL',
      m.description = 'Touchscreen or button controls? The best arcade style depends on your audience. Here''s a practical comparison to help you decide what fits best.'
  WHERE m.model_type = @mt AND p.slug = 'touchscreen-vs-button-controls-which-arcade-style-is-right-for-you';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Touchscreen vs. Button Controls — JVL',
    'Touchscreen or button controls? The best arcade style depends on your audience. Here''s a practical comparison to help you decide what fits best.'
  FROM pages p WHERE p.slug = 'touchscreen-vs-button-controls-which-arcade-style-is-right-for-you'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 14. why-did-arcades-fail
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Why Did Arcades Fail? — JVL',
      m.description = 'Arcades declined when home consoles eliminated their technical edge. Discover why the golden-era business model failed and which concepts survived.'
  WHERE m.model_type = @mt AND p.slug = 'why-did-arcades-fail';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Why Did Arcades Fail? — JVL',
    'Arcades declined when home consoles eliminated their technical edge. Discover why the golden-era business model failed and which concepts survived.'
  FROM pages p WHERE p.slug = 'why-did-arcades-fail'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 15. is-the-arcade-worth-it-in-2026
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is the Arcade Worth It in 2026? — JVL',
      m.description = 'Arcades in 2026 are great for social occasions, but home machines often offer better long-term value. Compare real costs to find the right choice.'
  WHERE m.model_type = @mt AND p.slug = 'is-the-arcade-worth-it-in-2026';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is the Arcade Worth It in 2026? — JVL',
    'Arcades in 2026 are great for social occasions, but home machines often offer better long-term value. Compare real costs to find the right choice.'
  FROM pages p WHERE p.slug = 'is-the-arcade-worth-it-in-2026'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 16. why-do-they-call-it-an-arcade
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Why Do They Call It an Arcade? — JVL',
      m.description = 'The word "arcade" comes from covered 19th-century commercial walkways. Learn how this term became synonymous with coin-operated gaming culture.'
  WHERE m.model_type = @mt AND p.slug = 'why-do-they-call-it-an-arcade';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Why Do They Call It an Arcade? — JVL',
    'The word "arcade" comes from covered 19th-century commercial walkways. Learn how this term became synonymous with coin-operated gaming culture.'
  FROM pages p WHERE p.slug = 'why-do-they-call-it-an-arcade'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 17. what-age-is-appropriate-for-arcades
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'What Age Is Appropriate for Arcades? — JVL',
      m.description = 'Arcades suit ages 5 and up depending on venue type and game selection. From family entertainment centers to adult barcades, here''s what to expect.'
  WHERE m.model_type = @mt AND p.slug = 'what-age-is-appropriate-for-arcades';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'What Age Is Appropriate for Arcades? — JVL',
    'Arcades suit ages 5 and up depending on venue type and game selection. From family entertainment centers to adult barcades, here''s what to expect.'
  FROM pages p WHERE p.slug = 'what-age-is-appropriate-for-arcades'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 18. what-are-the-10-most-popular-arcade-games
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'What Are the 10 Most Popular Arcade Games? — JVL',
      m.description = 'From Pac-Man to Street Fighter II, these 10 titles shaped a generation. Discover the iconic games that defined the arcade golden era.'
  WHERE m.model_type = @mt AND p.slug = 'what-are-the-10-most-popular-arcade-games';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'What Are the 10 Most Popular Arcade Games? — JVL',
    'From Pac-Man to Street Fighter II, these 10 titles shaped a generation. Discover the iconic games that defined the arcade golden era.'
  FROM pages p WHERE p.slug = 'what-are-the-10-most-popular-arcade-games'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 19. what-do-you-need-to-run-an-arcade
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'What Do You Need to Run an Arcade? — JVL',
      m.description = 'Running an arcade requires space, 15–30 machines, licensing, staffing, and solid cash reserves. Here''s a complete breakdown of what''s involved.'
  WHERE m.model_type = @mt AND p.slug = 'what-do-you-need-to-run-an-arcade';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'What Do You Need to Run an Arcade? — JVL',
    'Running an arcade requires space, 15–30 machines, licensing, staffing, and solid cash reserves. Here''s a complete breakdown of what''s involved.'
  FROM pages p WHERE p.slug = 'what-do-you-need-to-run-an-arcade'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 20. why-do-people-buy-arcade-machines
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Why Do People Buy Arcade Machines? — JVL',
      m.description = 'Adults buy arcade machines for nostalgia and family entertainment. See why premium home arcades are becoming a sought-after investment.'
  WHERE m.model_type = @mt AND p.slug = 'why-do-people-buy-arcade-machines';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Why Do People Buy Arcade Machines? — JVL',
    'Adults buy arcade machines for nostalgia and family entertainment. See why premium home arcades are becoming a sought-after investment.'
  FROM pages p WHERE p.slug = 'why-do-people-buy-arcade-machines'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 21. how-to-start-a-game-room-business
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How to Start a Game Room Business? — JVL',
      m.description = 'Starting a game room requires $75,000–$250,000, the right location, permits, and planning. Here''s a practical step-by-step guide to get started.'
  WHERE m.model_type = @mt AND p.slug = 'how-to-start-a-game-room-business';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How to Start a Game Room Business? — JVL',
    'Starting a game room requires $75,000–$250,000, the right location, permits, and planning. Here''s a practical step-by-step guide to get started.'
  FROM pages p WHERE p.slug = 'how-to-start-a-game-room-business'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 22. is-the-arcade-industry-growing
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is the Arcade Industry Growing? — JVL',
      m.description = 'Traditional arcades are contracting, but barcades and home arcade sales are booming. Here''s where real growth is happening in a $3.8B global market.'
  WHERE m.model_type = @mt AND p.slug = 'is-the-arcade-industry-growing';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is the Arcade Industry Growing? — JVL',
    'Traditional arcades are contracting, but barcades and home arcade sales are booming. Here''s where real growth is happening in a $3.8B global market.'
  FROM pages p WHERE p.slug = 'is-the-arcade-industry-growing'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 23. what-do-you-need-to-start-an-arcade-business
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How to Start an Arcade Business — JVL',
      m.description = 'Starting an arcade business requires $50,000–$200,000, a high-traffic location, 15–30 machines, and licensing. Here''s everything you need to know.'
  WHERE m.model_type = @mt AND p.slug = 'what-do-you-need-to-start-an-arcade-business';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How to Start an Arcade Business — JVL',
    'Starting an arcade business requires $50,000–$200,000, a high-traffic location, 15–30 machines, and licensing. Here''s everything you need to know.'
  FROM pages p WHERE p.slug = 'what-do-you-need-to-start-an-arcade-business'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 24. what-is-the-most-profitable-arcade-game
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'What Is the Most Profitable Arcade Game? — JVL',
      m.description = 'Redemption and skill games earn $300–$600/month — far ahead of classic video games. Discover the most profitable arcade game types for your venue.'
  WHERE m.model_type = @mt AND p.slug = 'what-is-the-most-profitable-arcade-game';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'What Is the Most Profitable Arcade Game? — JVL',
    'Redemption and skill games earn $300–$600/month — far ahead of classic video games. Discover the most profitable arcade game types for your venue.'
  FROM pages p WHERE p.slug = 'what-is-the-most-profitable-arcade-game'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 25. how-much-money-can-your-arcade-make
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'How Much Money Can Your Arcade Make? — JVL',
      m.description = 'A well-run arcade earns $50,000–$300,000 annually with 10–25% net margins. See what drives revenue and what to realistically expect.'
  WHERE m.model_type = @mt AND p.slug = 'how-much-money-can-your-arcade-make';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'How Much Money Can Your Arcade Make? — JVL',
    'A well-run arcade earns $50,000–$300,000 annually with 10–25% net margins. See what drives revenue and what to realistically expect.'
  FROM pages p WHERE p.slug = 'how-much-money-can-your-arcade-make'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 26. is-it-cheaper-to-build-or-buy-an-arcade-machine
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is It Cheaper to Build or Buy an Arcade Machine? — JVL',
      m.description = 'DIY arcade builds cost $300–$800 in parts, but pre-built machines offer better quality and warranty coverage. Here''s which route is right for you.'
  WHERE m.model_type = @mt AND p.slug = 'is-it-cheaper-to-build-or-buy-an-arcade-machine';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is It Cheaper to Build or Buy an Arcade Machine? — JVL',
    'DIY arcade builds cost $300–$800 in parts, but pre-built machines offer better quality and warranty coverage. Here''s which route is right for you.'
  FROM pages p WHERE p.slug = 'is-it-cheaper-to-build-or-buy-an-arcade-machine'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 27. is-arcade-good-passive-income
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is Arcade Good Passive Income? — JVL',
      m.description = 'Arcades require active management and daily oversight — not passive income. Here''s the honest reality of arcade ownership before you invest.'
  WHERE m.model_type = @mt AND p.slug = 'is-arcade-good-passive-income';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is Arcade Good Passive Income? — JVL',
    'Arcades require active management and daily oversight — not passive income. Here''s the honest reality of arcade ownership before you invest.'
  FROM pages p WHERE p.slug = 'is-arcade-good-passive-income'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 28. is-owning-an-arcade-worth-it
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is Owning an Arcade Worth It? — JVL',
      m.description = 'Owning an arcade can yield 15–25% annual returns, but takes $50,000–$150,000 upfront and up to 36 months to reach profitability.'
  WHERE m.model_type = @mt AND p.slug = 'is-owning-an-arcade-worth-it';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is Owning an Arcade Worth It? — JVL',
    'Owning an arcade can yield 15–25% annual returns, but takes $50,000–$150,000 upfront and up to 36 months to reach profitability.'
  FROM pages p WHERE p.slug = 'is-owning-an-arcade-worth-it'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

-- 29. is-an-arcade-business-profitable
UPDATE metas m JOIN pages p ON m.model_id = p.id
  SET m.title = 'Is an Arcade Business Profitable? — JVL',
      m.description = 'Arcade businesses can earn 15–30% margins and up to $300,000 annually when managed well. Learn what determines whether your arcade will succeed.'
  WHERE m.model_type = @mt AND p.slug = 'is-an-arcade-business-profitable';
INSERT INTO metas (model_type, model_id, title, description)
  SELECT @mt, p.id,
    'Is an Arcade Business Profitable? — JVL',
    'Arcade businesses can earn 15–30% margins and up to $300,000 annually when managed well. Learn what determines whether your arcade will succeed.'
  FROM pages p WHERE p.slug = 'is-an-arcade-business-profitable'
  AND NOT EXISTS (SELECT 1 FROM metas WHERE model_type = @mt AND model_id = p.id);

COMMIT;

SELECT CONCAT('Done: ', COUNT(*), ' meta records total for these articles') AS result
FROM metas m
JOIN pages p ON m.model_id = p.id
WHERE m.model_type = 'App\Models\Page'
AND p.slug IN (
  'are-arcade-games-good-for-your-brain','are-arcades-basically-gambling',
  'are-arcades-dying-out','are-arcades-expensive-to-run',
  'are-home-arcade-machines-worth-getting','can-i-add-games-to-an-arcade-machine',
  'can-i-put-modern-games-on-an-arcade-cabinet','do-arcade-machines-use-a-lot-of-electricity',
  'how-does-an-arcade-get-the-games-for-its-machines','how-much-can-an-arcade-make-a-day',
  'how-much-did-arcade-machines-cost','is-buying-vintage-arcade-video-game-machines-a-good-investment',
  'touchscreen-vs-button-controls-which-arcade-style-is-right-for-you','why-did-arcades-fail',
  'is-the-arcade-worth-it-in-2026','why-do-they-call-it-an-arcade',
  'what-age-is-appropriate-for-arcades','what-are-the-10-most-popular-arcade-games',
  'what-do-you-need-to-run-an-arcade','why-do-people-buy-arcade-machines',
  'how-to-start-a-game-room-business','is-the-arcade-industry-growing',
  'what-do-you-need-to-start-an-arcade-business','what-is-the-most-profitable-arcade-game',
  'how-much-money-can-your-arcade-make','is-it-cheaper-to-build-or-buy-an-arcade-machine',
  'is-arcade-good-passive-income','is-owning-an-arcade-worth-it','is-an-arcade-business-profitable'
);
