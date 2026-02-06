# Plan d'Action : AI Bulk File Renamer

## Phase 1 : Initialisation & Configuration 🏗️
- [x] Initialiser le projet Next.js
- [x] Installer les dépendances UI (lucide-react, framer-motion)
- [ ] Configurer les variables d'environnement (API Key Gemini) -> *En attente utilisateur*

## Phase 2 : Développement Frontend & UI 🎨
- [x] Créer le layout principal (Drag & Drop zone)
- [x] Intégrer les composants de liste de fichiers
- [x] Ajouter l'input pour le prompt de renommage (Natural Language)
- [x] Implémenter la prévisualisation des changements (Diff view)
- [x] **Design V4 (Linear Light)** implémenté.

## Phase 3 : Logique de Renommage & IA 🧠
- [x] Créer l'API Route (Mock)
- [x] Implémenter le parser de prompt (Mock logic)
- [ ] **INTEGRATION REELLE** (Brancher Gemini/OpenAI)

## Phase 4 : Tests & QA 🐛
- [x] Tester les cas nominaux (Unit Tests Mock)
- [x] Créer un Dataset de Test complet (30+ scénarios)
- [x] Configurer l'environnement de test (Vitest)

## Phase 5 : Déploiement 🚀
- [x] Configurer le repo GitHub
- [x] Déployer sur Vercel (Production Live)

## Backlog V2 (Futur) 🔮
- [ ] **Mode Conversationnel** : Permettre à l'utilisateur d'affiner sa demande ("Non, mets la date à la fin") sans repartir de zéro.
- [ ] **Gestion des doublons** : Améliorer l'intelligence sur les fichiers homonymes.
- [ ] **Tests E2E** : Valider le flux complet avec Cypress/Playwright.

---
*Mis à jour le 06/02/2026 par Stéphanie*