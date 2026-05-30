echo "KeyForAgents Landing Page Deployment"
echo "===================================="
echo ""

cd apps/keyforagents-landing

echo "Installing dependencies..."
npm install

echo ""
echo "Building application..."
npm run build

echo ""
echo "Deployment ready!"
echo ""
echo "To deploy to Vercel, run:"
echo "  vercel --prod"
echo ""
echo "Or import this project in Vercel dashboard"
