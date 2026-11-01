# Developer Setup Guide

## Product Page Generation System

This project uses an automated system to generate static HTML product pages from `equipment-data.js` for SEO purposes while maintaining the existing modal-based UX.

---

## 🚀 Quick Setup

### 1. Install Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) (LTS version recommended).

Verify installation:
```bash
node --version
npm --version
```

### 2. Activate Pre-Commit Hook

**On Mac/Linux:**
```bash
chmod +x .git/hooks/pre-commit
chmod +x scripts/generate-product-pages.js
```

**On Windows (Git Bash):**
```bash
git update-index --chmod=+x .git/hooks/pre-commit
```

### 3. Test the Generator

Manually test the generator before committing:
```bash
node scripts/generate-product-pages.js
```

You should see green success messages and a `products/` directory with 103 HTML files.

---

## 📝 How It Works

### Automatic Generation (Pre-Commit Hook)

When you modify `equipment-data.js` and commit:

1. **Pre-commit hook triggers** - Detects `equipment-data.js` in staged files
2. **Generator runs** - Creates/updates product pages in `products/` directory
3. **Sitemap updates** - Regenerates `sitemap.xml` with all URLs
4. **Files staged** - Automatically adds generated files to your commit

**Example workflow:**
```bash
# Edit equipment data
vim equipment-data.js

# Stage your changes
git add equipment-data.js

# Commit triggers generator automatically
git commit -m "Added new PA system"

# Generator output:
# ✓ Loaded 103 products
# ✓ Generated 1 new product pages
# ✓ Generated sitemap.xml
# ✓ Product pages generated and staged successfully
```

### Manual Generation

Run the generator anytime:

```bash
# Generate only new/missing pages
npm run generate-products

# Force regenerate ALL pages
npm run generate-products:force
```

---

## 🔧 Troubleshooting

### Error: "command not found: node"

**Solution:** Install Node.js from [https://nodejs.org/](https://nodejs.org/)

### Error: "Permission denied"

**Mac/Linux Solution:**
```bash
chmod +x .git/hooks/pre-commit
chmod +x scripts/generate-product-pages.js
```

**Windows Solution:** Run Git Bash as Administrator

### Error: "Could not parse EQUIPMENT_DATA"

**Solution:** Check `equipment-data.js` for syntax errors:
- Missing commas between objects
- Unclosed brackets `]`
- Invalid JavaScript syntax

Use a JSON validator or run:
```bash
node -c equipment-data.js
```

### Error: "EACCES: permission denied, mkdir"

**Solution:** Check folder permissions:
```bash
# Mac/Linux
chmod 755 .

# Windows: Run terminal as Administrator
```

### Warning: Hook not executing

**Check if hook exists:**
```bash
ls -la .git/hooks/pre-commit
```

**Should show:** `-rwxr-xr-x` (executable permissions)

**If missing:** Copy from `scripts/pre-commit` template

---

## 🎯 Generated Files

### Products Directory

Each equipment item gets a static HTML page:

```
products/
├── PA-01.html      (Meyer Sound UPA-1P)
├── PA-02.html      (Meyer Sound USW-1P)
├── MI-D-01.html    (Shure Beta 58 A)
└── ...             (103 total files)
```

### Sitemap

`sitemap.xml` includes:
- Main pages (index, catalog, services, contact)
- All 103 product pages
- Updated timestamps
- SEO priority values

---

## 🚨 Skipping the Hook (Not Recommended)

To commit without running the generator:

```bash
git commit --no-verify -m "Your message"
```

⚠️ **Warning:** This will skip product page generation and may cause SEO issues.

---

## 🧪 Testing

### Test Product Page Generation

```bash
# Test basic generation
npm run generate-products

# Test force regeneration
npm run generate-products:force

# Check generated HTML
ls products/
cat products/PA-01.html
```

### Test Pre-Commit Hook

```bash
# Make a test change
echo "// test" >> equipment-data.js

# Stage and commit
git add equipment-data.js
git commit -m "Test commit"

# Should see generator output before commit completes
```

### Validate Generated Pages

1. Open `products/PA-01.html` in browser
2. Check meta tags in source (View Page Source)
3. Test Open Graph: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
4. Test Twitter Cards: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## 📚 File Reference

### Key Files

- **equipment-data.js** - Product database (triggers generation when changed)
- **scripts/generate-product-pages.js** - Node.js generator script
- **.git/hooks/pre-commit** - Git hook that runs generator
- **package.json** - NPM scripts configuration
- **sitemap.xml** - Generated sitemap for search engines

### Template Structure

Product pages include:
- ✅ SEO meta tags (title, description, canonical)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Schema.org Product structured data
- ✅ Static content for crawlers
- ✅ Auto-modal-trigger JavaScript
- ✅ Breadcrumb navigation
- ✅ Variant handling (for cables, power cables)

---

## 🤝 Contributing

When adding new products:

1. Edit `equipment-data.js`
2. Add product image to `images/` (filename matches product ID)
3. Commit changes - generator runs automatically
4. Verify generated page in `products/`

When modifying the generator:

1. Edit `scripts/generate-product-pages.js`
2. Test with `npm run generate-products:force`
3. Commit both generator and regenerated pages

---

## ❓ FAQ

**Q: Do I need to manually create product pages?**  
A: No, they're generated automatically when you commit changes to `equipment-data.js`.

**Q: Can I edit generated product pages?**  
A: No, they'll be overwritten. Edit the template in `scripts/generate-product-pages.js` instead.

**Q: What if I add a product without an image?**  
A: The page will still generate. Images have `onerror="this.style.display='none'"` fallback.

**Q: How do I update existing product pages?**  
A: Edit `equipment-data.js` and commit, or run `npm run generate-products:force`.

**Q: Does this slow down commits?**  
A: Only when `equipment-data.js` changes. Typical generation takes 2-3 seconds for all 103 pages.

---

## 📞 Support

For issues:
1. Check this guide's troubleshooting section
2. Verify Node.js is installed: `node --version`
3. Test generator manually: `npm run generate-products`
4. Check error messages - they include suggested solutions

---

**Last Updated:** January 29, 2026
