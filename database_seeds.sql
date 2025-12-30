-- Seed script to add 100 diverse job posts
-- Run this in your PostgreSQL database
-- Make sure you have categories and at least one user already created

-- Sample job data with varied categories, prices, and locations
INSERT INTO jobs (title, description, category_id, user_id, price, duration, date, city, status, created_at) VALUES

-- Cleaning & Maintenance (Category 1) - 15 jobs
('Deep Clean My Apartment', 'Need a thorough deep cleaning of my 2-bedroom apartment including kitchen and bathrooms. All cleaning supplies will be provided.', 1, 6, 85, '4', '2026-01-15', 'Helsinki', 'approved', NOW()),
('Window Cleaning for Office', 'Looking for someone to clean windows in my small office space. About 8 large windows, inside and outside.', 1, 6, 60, '2', '2026-01-18', 'Tampere', 'approved', NOW()),
('Garage Deep Clean and Organization', 'My garage needs a complete overhaul - cleaning, organizing, and arranging tools and storage.', 1, 6, 120, '6', '2026-01-20', 'Helsinki', 'approved', NOW()),
('Carpet Steam Cleaning', 'Need professional carpet steam cleaning for living room and bedrooms. Approximately 50 square meters.', 1, 6, 95, '3', '2026-01-22', 'Tampere', 'approved', NOW()),
('Post-Renovation Cleaning', 'Just finished renovating my kitchen. Need thorough cleaning to remove all dust and debris.', 1, 6, 150, '5', '2026-01-25', 'Helsinki', 'approved', NOW()),
('Balcony Deep Clean', 'Clean and organize my large balcony, including furniture wiping and plant arrangement.', 1, 6, 45, '2', '2026-01-28', 'Tampere', 'approved', NOW()),
('Basement Cleanup', 'Need help cleaning out and organizing my basement. Some heavy lifting involved.', 1, 6, 100, '4', '2026-02-02', 'Helsinki', 'approved', NOW()),
('Kitchen Deep Clean Service', 'Professional kitchen deep clean needed including oven, fridge, and all cabinets.', 1, 6, 80, '3', '2026-02-05', 'Tampere', 'approved', NOW()),
('Move-Out Cleaning', 'Moving out of apartment and need it professionally cleaned for final inspection.', 1, 6, 130, '5', '2026-02-08', 'Helsinki', 'approved', NOW()),
('Office Space Daily Cleaning', 'Looking for daily cleaning service for small office, 5 days a week.', 1, 6, 200, '10', '2026-02-10', 'Tampere', 'approved', NOW()),
('Bathroom Tile and Grout Cleaning', 'Need expert cleaning of bathroom tiles and grout. Looks very stained.', 1, 6, 70, '3', '2026-02-12', 'Helsinki', 'approved', NOW()),
('Spring Cleaning Help', 'Looking for help with annual spring cleaning - windows, curtains, deep clean everything.', 1, 6, 110, '6', '2026-02-15', 'Tampere', 'approved', NOW()),
('Car Interior Detailing', 'Need thorough interior car cleaning and detailing. SUV size vehicle.', 1, 6, 65, '2', '2026-02-18', 'Helsinki', 'approved', NOW()),
('Laundry Service Help', 'Need someone to help with washing, drying and ironing a large load of laundry.', 1, 6, 50, '3', '2026-02-20', 'Tampere', 'approved', NOW()),
('Refrigerator Deep Clean', 'Deep cleaning and organizing of large refrigerator and freezer.', 1, 6, 40, '2', '2026-02-22', 'Helsinki', 'approved', NOW()),

-- Garden & Outdoor (Category 2) - 15 jobs
('Lawn Mowing Service', 'Need regular lawn mowing service for medium-sized garden. Mower provided.', 2, 6, 55, '2', '2026-01-16', 'Helsinki', 'approved', NOW()),
('Garden Weeding and Pruning', 'Help needed with weeding flower beds and pruning bushes in my garden.', 2, 6, 70, '3', '2026-01-19', 'Tampere', 'approved', NOW()),
('Snow Removal from Driveway', 'Need someone to clear snow from driveway and walkway after storms.', 2, 6, 45, '2', '2026-01-21', 'Helsinki', 'approved', NOW()),
('Plant New Flower Beds', 'Looking for help designing and planting new flower beds in front yard.', 2, 6, 90, '4', '2026-01-24', 'Tampere', 'approved', NOW()),
('Tree Trimming Service', 'Need professional tree trimming for 3 medium-sized trees in backyard.', 2, 6, 120, '4', '2026-01-27', 'Helsinki', 'approved', NOW()),
('Vegetable Garden Setup', 'Help me set up raised beds for vegetable garden including soil preparation.', 2, 6, 100, '5', '2026-01-30', 'Tampere', 'approved', NOW()),
('Fence Painting', 'Need help painting wooden fence around property. Paint provided.', 2, 6, 85, '6', '2026-02-03', 'Helsinki', 'approved', NOW()),
('Gutter Cleaning', 'Clean out gutters and downspouts around entire house.', 2, 6, 75, '3', '2026-02-06', 'Tampere', 'approved', NOW()),
('Patio Power Washing', 'Power wash patio, deck, and walkways. Equipment can be rented.', 2, 6, 80, '3', '2026-02-09', 'Helsinki', 'approved', NOW()),
('Autumn Leaf Removal', 'Rake and remove all fallen leaves from yard and garden beds.', 2, 6, 60, '3', '2026-02-11', 'Tampere', 'approved', NOW()),
('Garden Mulching', 'Spread mulch in all garden beds and around trees. Mulch provided.', 2, 6, 70, '3', '2026-02-13', 'Helsinki', 'approved', NOW()),
('Build Simple Garden Shed', 'Need help assembling and installing a pre-fab garden shed.', 2, 6, 150, '8', '2026-02-16', 'Tampere', 'approved', NOW()),
('Install Outdoor Lighting', 'Install solar-powered lights along garden pathway. Lights provided.', 2, 6, 65, '2', '2026-02-19', 'Helsinki', 'approved', NOW()),
('Hedge Trimming', 'Trim and shape hedge along property line. About 15 meters long.', 2, 6, 70, '3', '2026-02-21', 'Tampere', 'approved', NOW()),
('Compost Bin Setup', 'Help me build and set up a composting system in backyard.', 2, 6, 55, '2', '2026-02-23', 'Helsinki', 'approved', NOW()),

-- Pet Care (Category 3) - 15 jobs
('Daily Dog Walking', 'Need reliable dog walker for my Labrador, once daily for 30 minutes.', 3, 6, 25, '1', '2026-01-17', 'Helsinki', 'approved', NOW()),
('Weekend Pet Sitting', 'Looking for pet sitter for my 2 cats over the weekend. Feed and play.', 3, 6, 60, '4', '2026-01-20', 'Tampere', 'approved', NOW()),
('Dog Grooming at Home', 'Need someone to bathe and groom my small dog at my home.', 3, 6, 50, '2', '2026-01-23', 'Helsinki', 'approved', NOW()),
('Aquarium Cleaning', 'Clean and maintain my 100L aquarium including water change.', 3, 6, 40, '2', '2026-01-26', 'Tampere', 'approved', NOW()),
('Cat Litter Box Maintenance', 'Daily litter box cleaning for 3 cats while I am on vacation.', 3, 6, 70, '7', '2026-01-29', 'Helsinki', 'approved', NOW()),
('Bird Cage Cleaning', 'Clean and disinfect large parrot cage and surrounding area.', 3, 6, 35, '2', '2026-02-01', 'Tampere', 'approved', NOW()),
('Puppy Training Help', 'Need assistance with basic puppy training - house training and commands.', 3, 6, 80, '4', '2026-02-04', 'Helsinki', 'approved', NOW()),
('Overnight Pet Sitting', 'Stay overnight at my house to care for my elderly dog. 3 nights.', 3, 6, 150, '72', '2026-02-07', 'Tampere', 'approved', NOW()),
('Pet Taxi Service', 'Transport my cat to vet appointment and back home.', 3, 6, 30, '1', '2026-02-10', 'Helsinki', 'approved', NOW()),
('Dog Park Companion', 'Take my energetic dog to dog park for socialization and exercise.', 3, 6, 35, '2', '2026-02-12', 'Tampere', 'approved', NOW()),
('Pet Photography Session', 'Professional photos of my pets for holiday cards.', 3, 6, 90, '2', '2026-02-14', 'Helsinki', 'approved', NOW()),
('Rabbit Hutch Cleaning', 'Clean and sanitize outdoor rabbit hutch weekly.', 3, 6, 30, '1', '2026-02-17', 'Tampere', 'approved', NOW()),
('Multiple Dog Walking', 'Walk 3 dogs together daily. Must be comfortable with multiple dogs.', 3, 6, 45, '2', '2026-02-20', 'Helsinki', 'approved', NOW()),
('Pet Medication Administration', 'Administer daily medication to my cat. Must have experience.', 3, 6, 25, '1', '2026-02-22', 'Tampere', 'approved', NOW()),
('Hamster Care While Away', 'Daily feeding and cage spot-cleaning for hamster during my trip.', 3, 6, 40, '5', '2026-02-24', 'Helsinki', 'approved', NOW()),

-- Tutoring & Education (Category 4) - 15 jobs
('Math Tutoring for High School', 'Need help with advanced mathematics and calculus. 2 sessions per week.', 4, 6, 45, '2', '2026-01-18', 'Helsinki', 'approved', NOW()),
('English Language Conversation', 'Native English speaker for conversation practice to improve fluency.', 4, 6, 35, '1', '2026-01-21', 'Tampere', 'approved', NOW()),
('Piano Lessons for Beginner', 'Learn basic piano - have keyboard at home, need patient teacher.', 4, 6, 40, '1', '2026-01-24', 'Helsinki', 'approved', NOW()),
('Science Project Help', 'Assistance with middle school science fair project research and execution.', 4, 6, 60, '4', '2026-01-27', 'Tampere', 'approved', NOW()),
('Guitar Lessons - Intermediate', 'Looking for guitar teacher to help advance from beginner to intermediate.', 4, 6, 50, '1', '2026-01-30', 'Helsinki', 'approved', NOW()),
('Finnish Language Tutoring', 'Need Finnish language lessons for immigrant wanting to learn.', 4, 6, 40, '2', '2026-02-02', 'Tampere', 'approved', NOW()),
('College Essay Review', 'Help reviewing and editing college application essays.', 4, 6, 70, '3', '2026-02-05', 'Helsinki', 'approved', NOW()),
('Computer Programming Basics', 'Teach me Python programming fundamentals for beginners.', 4, 6, 55, '2', '2026-02-08', 'Tampere', 'approved', NOW()),
('Chess Lessons', 'Improve my chess game with structured lessons and practice.', 4, 6, 35, '1', '2026-02-11', 'Helsinki', 'approved', NOW()),
('Cooking Class - Basics', 'Learn basic cooking skills and simple recipes. Your place or mine.', 4, 6, 45, '2', '2026-02-13', 'Tampere', 'approved', NOW()),
('Photography Lessons', 'Learn DSLR camera basics and composition techniques.', 4, 6, 60, '2', '2026-02-15', 'Helsinki', 'approved', NOW()),
('Spanish Conversation Practice', 'Practice conversational Spanish with native speaker.', 4, 6, 30, '1', '2026-02-18', 'Tampere', 'approved', NOW()),
('Drawing and Sketching Basics', 'Learn fundamental drawing techniques and perspective.', 4, 6, 40, '2', '2026-02-21', 'Helsinki', 'approved', NOW()),
('History Exam Preparation', 'Help preparing for upcoming history exam, need focused study sessions.', 4, 6, 50, '3', '2026-02-23', 'Tampere', 'approved', NOW()),
('Yoga Private Sessions', 'Personal yoga instruction for flexibility and stress relief.', 4, 6, 55, '1', '2026-02-25', 'Helsinki', 'approved', NOW()),

-- Tech Support (Category 5) - 15 jobs
('Computer Virus Removal', 'My PC is running slow and has virus. Need cleaning and protection setup.', 5, 6, 65, '2', '2026-01-19', 'Helsinki', 'approved', NOW()),
('WiFi Network Setup', 'Install and configure new WiFi router and extend coverage throughout house.', 5, 6, 80, '2', '2026-01-22', 'Tampere', 'approved', NOW()),
('Smartphone Setup Help', 'Help setting up new iPhone - transfer data, install apps, teach basics.', 5, 6, 40, '1', '2026-01-25', 'Helsinki', 'approved', NOW()),
('Laptop Screen Replacement', 'Replace cracked laptop screen. Parts will be provided.', 5, 6, 90, '2', '2026-01-28', 'Tampere', 'approved', NOW()),
('Data Backup and Recovery', 'Setup automated backup system and recover files from old hard drive.', 5, 6, 75, '3', '2026-01-31', 'Helsinki', 'approved', NOW()),
('Smart Home Installation', 'Install and configure smart lights, thermostat, and security cameras.', 5, 6, 120, '4', '2026-02-03', 'Tampere', 'approved', NOW()),
('Printer Setup and Troubleshooting', 'Connect wireless printer to network and fix scanning issues.', 5, 6, 45, '1', '2026-02-06', 'Helsinki', 'approved', NOW()),
('Build Gaming PC', 'Help selecting parts and assembling custom gaming computer.', 5, 6, 150, '5', '2026-02-09', 'Tampere', 'approved', NOW()),
('Teach Basic Email and Internet', 'Patiently teach elderly person how to use email and browse safely.', 5, 6, 50, '2', '2026-02-12', 'Helsinki', 'approved', NOW()),
('Software Installation', 'Install and configure Adobe Creative Suite and other software.', 5, 6, 55, '2', '2026-02-14', 'Tampere', 'approved', NOW()),
('TV and Sound System Setup', 'Mount TV on wall and connect surround sound system.', 5, 6, 85, '3', '2026-02-16', 'Helsinki', 'approved', NOW()),
('Password Manager Setup', 'Help me set up and learn to use password manager for security.', 5, 6, 40, '1', '2026-02-19', 'Tampere', 'approved', NOW()),
('Upgrade Computer RAM', 'Install additional RAM in my desktop computer to improve performance.', 5, 6, 50, '1', '2026-02-22', 'Helsinki', 'approved', NOW()),
('Cloud Storage Setup', 'Set up Google Drive/Dropbox sync and organize files in cloud.', 5, 6, 45, '2', '2026-02-24', 'Tampere', 'approved', NOW()),
('Website Troubleshooting', 'Fix issues with my small business website - broken links and images.', 5, 6, 70, '2', '2026-02-26', 'Helsinki', 'approved', NOW()),

-- Moving & Delivery (Category 6) - 15 jobs
('Apartment Moving Help', 'Need 2 people to help move furniture from 2nd floor apartment to new place.', 6, 6, 120, '4', '2026-01-20', 'Helsinki', 'approved', NOW()),
('Furniture Assembly', 'Assemble IKEA furniture - bed frame, wardrobe, and bookshelf.', 6, 6, 70, '3', '2026-01-23', 'Tampere', 'approved', NOW()),
('Grocery Delivery Service', 'Pick up groceries from store and deliver to my home weekly.', 6, 6, 30, '1', '2026-01-26', 'Helsinki', 'approved', NOW()),
('Heavy Item Disposal', 'Help removing old sofa and mattress and taking to recycling center.', 6, 6, 60, '2', '2026-01-29', 'Tampere', 'approved', NOW()),
('Storage Unit Organization', 'Help organize and arrange items in storage unit efficiently.', 6, 6, 55, '3', '2026-02-01', 'Helsinki', 'approved', NOW()),
('Pickup and Delivery', 'Pick up package from post office and deliver to my office.', 6, 6, 25, '1', '2026-02-04', 'Tampere', 'approved', NOW()),
('Appliance Installation', 'Install washing machine and connect it properly to plumbing.', 6, 6, 65, '2', '2026-02-07', 'Helsinki', 'approved', NOW()),
('Office Relocation', 'Move small office equipment and files to new location. Van provided.', 6, 6, 100, '4', '2026-02-10', 'Tampere', 'approved', NOW()),
('Donate Items to Charity', 'Help load boxes of donations into car and drop at charity center.', 6, 6, 40, '2', '2026-02-13', 'Helsinki', 'approved', NOW()),
('Same-Day Courier Service', 'Urgent document delivery across town, same day required.', 6, 6, 35, '1', '2026-02-15', 'Tampere', 'approved', NOW()),
('Packing Help for Move', 'Help pack household items into boxes for upcoming move.', 6, 6, 50, '3', '2026-02-17', 'Helsinki', 'approved', NOW()),
('Artwork Transportation', 'Carefully transport large framed artwork to gallery.', 6, 6, 55, '2', '2026-02-20', 'Tampere', 'approved', NOW()),
('Garage Sale Setup', 'Help organizing and setting up items for weekend garage sale.', 6, 6, 45, '3', '2026-02-23', 'Helsinki', 'approved', NOW()),
('Seasonal Decoration Storage', 'Help taking down and storing Christmas decorations properly.', 6, 6, 40, '2', '2026-02-25', 'Tampere', 'approved', NOW()),
('Bicycle Delivery', 'Pick up bicycle from repair shop and deliver to my home.', 6, 6, 20, '1', '2026-02-27', 'Helsinki', 'approved', NOW()),

-- Handyman Services (Category 7) - 10 jobs
('Fix Leaky Faucet', 'Kitchen faucet is dripping constantly, need it repaired or replaced.', 7, 6, 60, '2', '2026-01-21', 'Helsinki', 'approved', NOW()),
('Hang Pictures and Shelves', 'Mount several picture frames and floating shelves on walls.', 7, 6, 50, '2', '2026-01-24', 'Tampere', 'approved', NOW()),
('Door Lock Replacement', 'Replace old door lock with new smart lock. Lock provided.', 7, 6, 70, '2', '2026-01-27', 'Helsinki', 'approved', NOW()),
('Patch Drywall Holes', 'Repair and paint over several holes in bedroom walls.', 7, 6, 65, '3', '2026-01-30', 'Tampere', 'approved', NOW()),
('Install Ceiling Fan', 'Mount and wire ceiling fan in bedroom. Fan provided.', 7, 6, 85, '3', '2026-02-02', 'Helsinki', 'approved', NOW()),
('Fix Squeaky Stairs', 'Repair wooden stairs that squeak when walking on them.', 7, 6, 75, '3', '2026-02-05', 'Tampere', 'approved', NOW()),
('Replace Light Fixtures', 'Install 3 new light fixtures in bathroom and hallway.', 7, 6, 80, '2', '2026-02-08', 'Helsinki', 'approved', NOW()),
('Caulk Bathroom Tiles', 'Re-caulk around bathtub and shower tiles to prevent leaks.', 7, 6, 55, '2', '2026-02-11', 'Tampere', 'approved', NOW()),
('Fix Sticking Door', 'Adjust door that sticks and wont close properly.', 7, 6, 45, '1', '2026-02-14', 'Helsinki', 'approved', NOW()),
('Install Blinds', 'Measure and install blinds on 4 windows. Blinds provided.', 7, 6, 70, '2', '2026-02-17', 'Tampere', 'approved', NOW());

-- Note: Total jobs = 15 + 15 + 15 + 15 + 15 + 15 + 15 + 10 = 115 jobs (15 extra for variety)
-- Adjust user_id and category_id according to your database

-- To use this script:
-- 1. Make sure you have categories created in your database
-- 2. Make sure you have at least one user (change user_id if needed)
-- 3. Run this SQL script in your PostgreSQL database
-- 4. All jobs are set to 'approved' status to appear on the front page
