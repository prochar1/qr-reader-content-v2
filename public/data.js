window.APP_DATA = {
  pages: [
    {
      id: "home",
      title: "Úvod",
      content: `
# Vítejte

Toto je hlavní stránka aplikace.

## Co najdete

- Informace o nás
- Kontaktní údaje
- A mnoho dalšího...
`,
      children: [
        {
          id: "about",
          title: "O nás",
          content: `
# O nás

Jsme tým, který se zaměřuje na...

## Naše mise

Chceme vytvářet kvalitní aplikace.

## Náš tým

- Jan Novák - vývojář
- Marie Svobodová - designér
`,
        },
        {
          id: "contact",
          title: "Kontakt",
          content: `
# Kontakt

## Adresa

Praha 1, 

Václavské náměstí 1

## Email

info@example.com

## Telefon

+420 123 456 789
`,
        },
      ],
    },
    {
      id: "products",
      title: "Produkty",
      content: `
# Naše produkty

Nabízíme širokou škálu produktů...
`,
      children: [
        {
          id: "product1",
          title: "Produkt A",
          content: `
# Produkt A

Popis produktu A...

## Vlastnosti

- Vlastnost 1
- Vlastnost 2
`,
        },
      ],
    },
    {
      id: "gallery",
      title: "Galerie",
      content: `# Naše galerie

Zde jsou naše nejlepší fotky:

[GALLERY]
photo1.svg|Popis první fotky
photo2.svg|Popis druhé fotky
photo3.svg|Popis třetí fotky
[/GALLERY]

Text pokračuje...

[GALLERY]
photo1.svg|Popis první fotky
photo2.svg|Popis druhé fotky
photo3.svg|Popis třetí fotky
[/GALLERY]

Text dále pokračuje...

`,
    },
    {
      id: "video-page",
      title: "Video ukázka",
      content: `# Naše video

Podívejte se na naši prezentaci:

[VIDEO]
video.mp4|Prezentace společnosti
[/VIDEO]

[VIDEO]
video.mp4|Prezentace společnosti
[/VIDEO]

Text pokračuje dál...`,
    },
  ],
};
