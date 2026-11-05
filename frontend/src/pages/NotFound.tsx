import { LIVE } from '../content/site';
import { Button, PageHero } from '../components/ui';

export default function NotFound() {
  return (
    <PageHero eyebrow="Not in the preview yet" title="This page has not been redesigned yet" text="The preview has the home, about, team, FAQ and contact pages. Everything else still lives on the current site.">
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Back to home</Button>
        <Button href={LIVE + window.location.pathname} variant="ghost" external>Open it on fsia.in</Button>
      </div>
    </PageHero>
  );
}
