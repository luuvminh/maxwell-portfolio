// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme123!', 12)
  
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
      name: 'Maxwell',
      role: 'ADMIN',
    },
  })

  // Seed site settings
  const settings = [
    { key: 'site_name', value: 'Maxwell' },
    { key: 'site_tagline', value: 'Developer · Trader · Creator' },
    { key: 'site_description', value: 'Personal portfolio and blog.' },
    { key: 'site_email', value: process.env.ADMIN_EMAIL || 'admin@example.com' },
    { key: 'about_bio', value: 'I am a developer, options trader, and lifelong learner based in Melbourne, Australia. I build things, trade markets, and write about what I learn along the way.' },
    { key: 'social_github', value: '' },
    { key: 'social_linkedin', value: '' },
    { key: 'social_twitter', value: '' },
  ]

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }

  // Seed a sample blog post
  await prisma.post.upsert({
    where: { slug: 'welcome-to-my-site' },
    update: {},
    create: {
      slug: 'welcome-to-my-site',
      title: 'Welcome to My New Site',
      excerpt: 'I have moved away from WordPress. Here is why I built my own platform.',
      content: `# Welcome

This is my new personal site — built from scratch, hosted on Railway, and fully under my control.

## Why I Left WordPress

WordPress is powerful, but it became a maintenance burden. Too many plugins, too many updates, too much friction just to write a post.

## What This Site Is Built On

- **Next.js 14** — React framework with App Router
- **Prisma** — Type-safe database ORM
- **PostgreSQL** — Hosted on Railway
- **Custom Admin CMS** — No third-party dependency

## What You Will Find Here

- Writing on trading, technology, and language
- Portfolio of projects I have built
- Notes from my travels

Stay tuned.`,
      tags: ['meta', 'development'],
      published: true,
      featured: true,
      publishedAt: new Date(),
    },
  })

  // Seed a sample project
  await prisma.project.upsert({
    where: { slug: 'spx-iron-condor-tracker' },
    update: {},
    create: {
      slug: 'spx-iron-condor-tracker',
      title: 'SPX Iron Condor Tracker',
      description: 'A Notion-based trade logging system for tracking SPX 0DTE Iron Condor options trades with P&L analytics.',
      content: `## Overview

A complete trade logging and analytics system built inside Notion for tracking SPX 0DTE Iron Condor options strategies.

## Features

- Automated P&L extraction from IBKR reports
- IVR-based entry tracking
- 2R / 3R target calculations
- Weekly and monthly performance summaries

## Stack

- Notion database as backend
- IBKR API for trade data
- Claude AI for automated log entries`,
      tags: ['trading', 'automation', 'notion'],
      published: true,
      featured: true,
      order: 1,
    },
  })

  console.log('✅ Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
