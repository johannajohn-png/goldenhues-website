import { Link } from "react-router-dom";

function Footer() {
  const explore = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];
  const findUs = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/golden-hues-consultants-private-ltd/posts/?feedView=all",
    },
    {
      label: "Google Maps",
      href: "https://maps.app.goo.gl/ehkGqd93QfhpKQ4U9",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/goldenhues.consultants?igsh=MTUzdHl0cWV5YzJjaA%3D%3D",
    },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <span className="text-xl font-bold tracking-tight text-black">
            Golden<span className="text-neutral-400">Hues</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
            Founded in 2009, Golden Hues Consultants Private Ltd. delivers superior,
            methodology-driven HR and recruitment services — connecting exceptional
            talent with organisations that need them most.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Explore</h4>
          <ul className="space-y-3 text-sm text-neutral-600">
            {explore.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="transition-colors hover:text-black">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Find Us</h4>
          <ul className="space-y-3 text-sm text-neutral-600">
            {findUs.map((item) => (
              <li key={item.label}>
                
                 <a href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-6">
        <p className="text-center text-xs text-neutral-400">
          © GoldenHues 2009–2026. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;