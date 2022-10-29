# Agily - Test technique

[![Netlify Status](https://api.netlify.com/api/v1/badges/6db76d3f-dce8-476b-9593-2a7a7669cd81/deploy-status)](https://app.netlify.com/sites/dulcet-pie-3873ce/deploys)

## Introduction

N'ayant jamais fait de VueJS dans un projet (et encore moins du Nuxt JS), j'ai voulu profiter de ce test pour découvrir
cette technologie.

Cette découverte a donc influencé la façon dont j'ai abordé le test.

## Installation

Installer les dépendances:

```bash
$ yarn
```

Lancer le serveur de développement:

```bash
$ yarn dev
```

Vérifier le code:

```bash
$ yarn lint
```

## Découpage du projet

- Création du projet avec Nuxt JS, et découverte du framework (30-40 min)
- Création de la page d'accueil et tests de VueJs (30min)
- Ajout du responsive sur cette page / ajout du SCSS / mixins (15min)
- Redirection lors de la validation du formulaire (10min)
- Révision du CSS avec Vue & Ajout de la base de la page d'une ville (1h)
- Ajout des infos de la semaine (30min)
- Ajout du mode mobile (30min)
- Refacto du code (composants, types, ...) (1h)
- Ajout de netlify / eslint / CI (1h)

## Récapitulatif

Ce projet étant assez petit, je n'ai pas trouvé de "gros" principes à appliquer.

J'ai cependant tenté d'avoir un code propre, avec des composants pour les éléments complexes, et des types pour les
données.

J'ai aussi divisé mon style (SCSS) entre ceux scopés, et ceux génériques. L'utilisation du SCSS m'a aussi permis
d'utiliser des mixins génériques pour avoir un code plus propre.

Cependant, le fait de devoir se baser sur une maquette à base d'images a été assez compliqué (pas de notion d'espacement,
couleurs, ...). Aussi, certaines attentes (notamment la 6e) ont été assez compliqué à comprendre (sujet non raccord avec
les images).

