#!/bin/bash
# Proof-First Verification Checklist (5-Bird Platform)
# Run before committing strategic decisions

echo "🔍 PROOF-FIRST VERIFICATION CHECKLIST (5-BIRD METHODOLOGY)"
echo "============================================================"
echo ""

# 5-Bird Element 1: Intelligence
echo "🧠 INTELLIGENCE: Are all claims cited to source documents?"
read -p "  [y/n]: " source_check
if [ "$source_check" != "y" ]; then
  echo "  ❌ FAILED: Add source citations before proceeding"
  exit 1
fi

# 5-Bird Element 2: Evidence
echo "📄 EVIDENCE: Have all dates/facts been verified against records?"
read -p "  [y/n]: " evidence_check
if [ "$evidence_check" != "y" ]; then
  echo "  ❌ FAILED: Verify evidence accuracy"
  exit 1
fi

# 5-Bird Element 3: Coalition
echo "🤝 COALITION: Have key stakeholders confirmed this information?"
read -p "  [y/n]: " coalition_check
if [ "$coalition_check" != "y" ]; then
  echo "  ❌ FAILED: Obtain stakeholder confirmation"
  exit 1
fi

# 5-Bird Element 4: Regulatory
echo "⚖️ REGULATORY: Are legal/compliance requirements researched?"
read -p "  [y/n]: " regulatory_check
if [ "$regulatory_check" != "y" ]; then
  echo "  ❌ FAILED: Research regulatory requirements"
  exit 1
fi

# 5-Bird Element 5: Counter-intel
echo "🛡️ COUNTER-INTEL: Have alternative explanations been considered?"
read -p "  [y/n]: " counterintel_check
if [ "$counterintel_check" != "y" ]; then
  echo "  ❌ FAILED: Consider alternative scenarios"
  exit 1
fi

echo ""
echo "✅ PROOF-FIRST VERIFICATION COMPLETE (5-BIRD VALIDATED)"
echo "========================================================"
echo "Proceeding with confidence in verified facts."
