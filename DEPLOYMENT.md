# Deployment Guide - Howling Tempest Weather App

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI (Fastest)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? `howling-tempest-weather` (or your choice)
   - In which directory is your code located? `./`
   - Want to override settings? `N`

5. **Get your deployment URL!**
   - Example: `https://howling-tempest-weather.vercel.app`

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard (Most Visual)

1. **Push code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Visit Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your `bmad-learn` repository

3. **Configure Project:**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy!**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your live URL!

5. **Auto-Deploy Setup:**
   - Every push to `main` → automatic deployment
   - Pull requests → preview deployments
   - No extra config needed!

## 🌐 Other Deployment Options

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy:**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard:**
   - Visit [netlify.com](https://netlify.com)
   - Import from GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Set base in vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/bmad-learn/',
   });
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## ⚙️ Environment Configuration

**Good News:** This app requires NO environment variables!

- All APIs used are public and free
- No API keys needed
- No secrets to configure
- Just build and deploy!

## ✅ Pre-Deployment Checklist

- [x] All tests passing (`npm test`)
- [x] Production build works (`npm run build`)
- [x] No linting errors (`npm run lint`)
- [x] TypeScript compiles (`npm run type-check`)
- [x] Git repository clean
- [x] All changes committed

## 🧪 Testing Your Deployment

Once deployed, test these scenarios:

1. **Valid Zip Code:** Enter `10001` → Should show NYC weather
2. **Invalid Zip:** Enter `00000` → Should show friendly error
3. **Mobile View:** Open on phone → Should be responsive
4. **Loading State:** Watch for spinner during fetch
5. **Error Recovery:** Test retry button on errors

## 📊 Performance

Your deployed app will be:
- **Fast:** ~8 KB total (gzipped)
- **Global:** Served from CDN edge locations worldwide
- **Secure:** Automatic HTTPS
- **Reliable:** 99.9% uptime

## 🔧 Troubleshooting

### Build fails on Vercel/Netlify

**Issue:** `npm install` fails
**Solution:** Ensure `package.json` is committed

**Issue:** Build succeeds but app doesn't load
**Solution:** Check browser console for errors, verify `dist/` output

### API calls fail in production

**Issue:** CORS errors
**Solution:** Already handled - we use CORS-enabled APIs (Zippopotam, NWS)

### 404 on refresh

**Issue:** SPA routing breaks on page refresh
**Solution:** Already configured in `vercel.json` rewrites

## 📝 Post-Deployment

After deployment:

1. **Update README** with live demo URL
2. **Share your app** on social media! 🎉
3. **Monitor** using Vercel Analytics (free)
4. **Iterate** - push changes to auto-deploy

## 🎯 Custom Domain (Optional)

Want a custom domain like `weather.howlingtempest.com`?

1. Buy domain from any registrar
2. Add domain in Vercel dashboard
3. Update DNS records (Vercel provides instructions)
4. Automatic HTTPS certificate!

## 🤝 Continuous Deployment

Your app is now set up for continuous deployment:

```
Push to GitHub → Auto-build → Auto-test → Auto-deploy
```

Every push to `main` will:
1. Trigger Vercel build
2. Run `npm run build`
3. Deploy to production
4. Update your live URL

## 🎉 Success!

Your **Howling Tempest Weather App** is now live and accessible to the world!

**Next Steps:**
- Share your URL with friends
- Add it to your portfolio
- Keep building more features
- Enjoy your production app! 🌤️

---

Built with ❤️ using the BMAD Method

