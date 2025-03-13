export function JsonLd({ data }: { data: any }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  }
  
  