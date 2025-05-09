import React from "react"
import { Link } from "react-router-dom"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Home, Code, BookText, BarChart2, Compass, Calendar } from "lucide-react";

interface Props {
  className?: string
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert",
    href: "/docs/components/alert",
    description:
      "Display a prominent message with relevant information and actions.",
  },
  {
    title: "Accordion",
    href: "/docs/components/accordion",
    description: "A vertically collapsing panel to show and hide content.",
  },
  {
    title: "Aspect Ratio",
    href: "/docs/components/aspect-ratio",
    description: "Maintain the aspect ratio of an element when the size changes.",
  },
  {
    title: "Avatar",
    href: "/docs/components/avatar",
    description:
      "An image or icon that represents a user or entity. Used for profile pictures and more.",
  },
  {
    title: "Badge",
    href: "/docs/components/badge",
    description:
      "Display a small amount of contextual information, such as a count or status.",
  },
  {
    title: "Button",
    href: "/docs/components/button",
    description: "A button that triggers an action.",
  },
  {
    title: "Card",
    href: "/docs/components/card",
    description: "A container for grouping related content.",
  },
  {
    title: "Checkbox",
    href: "/docs/components/checkbox",
    description:
      "A control that allows the user to select one or more options from a set.",
  },
  {
    title: "Dialog",
    href: "/docs/components/dialog",
    description:
      "A window that appears on top of the main content to provide information or request input.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description: "For sighted users to preview information in place of its reference.",
  },
  {
    title: "Input",
    href: "/docs/components/input",
    description: "A field that allows the user to enter text.",
  },
  {
    title: "Label",
    href: "/docs/components/label",
    description: "A text element that describes an input or form control.",
  },
  {
    title: "Popover",
    href: "/docs/components/popover",
    description:
      "A transient view that floats on screen and is typically used for displaying contextual information.",
  },
  {
    title: "Radio Group",
    href: "/docs/components/radio-group",
    description:
      "A set of options that allows the user to select one option from a group.",
  },
  {
    title: "Select",
    href: "/docs/components/select",
    description:
      "A control that allows the user to select one option from a list of options.",
  },
  {
    title: "Separator",
    href: "/docs/components/separator",
    description: "Visually divide content.",
  },
  {
    title: "Sheet",
    href: "/docs/components/sheet",
    description:
      "A supplementary panel that slides in from the side of the screen.",
  },
  {
    title: "Skeleton",
    href: "/docs/components/skeleton",
    description: "Display a placeholder state while content is loading.",
  },
  {
    title: "Switch",
    href: "/docs/components/switch",
    description: "A control that allows the user to toggle between two states.",
  },
  {
    title: "Textarea",
    href: "/docs/components/textarea",
    description: "A field that allows the user to enter multiple lines of text.",
  },
  {
    title: "Toast",
    href: "/docs/components/toast",
    description:
      "Display a succinct message to the user, typically used for success or error messages.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description: "Display a brief, informative message when hovering over an element.",
  },
]

export const MainNav = ({ className }: Props) => {
  return (
    <NavigationMenu className={cn("hidden md:flex", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="flex items-center">
            <Icons.logo className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Problems</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/docs"
                    className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Problems
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Dive into a world of coding challenges designed to test
                      and expand your programming skills.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/fundamentals" title="Fundamentals">
                Master the basics with our fundamental problems.
              </ListItem>
              <ListItem href="/easy" title="Easy">
                Beginner-friendly challenges to get you started.
              </ListItem>
              <ListItem href="/medium" title="Medium">
                Intermediate problems to sharpen your skills.
              </ListItem>
              <ListItem href="/hard" title="Hard">
                Advanced challenges for experienced coders.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <ListItem
                href="/docs"
                title="Documentation"
              >
                Learn how to use our platform to its fullest potential.
              </ListItem>
              <ListItem
                href="/examples"
                title="Examples"
              >
                Explore real-world examples and use cases.
              </ListItem>
              <ListItem
                href="/themes"
                title="Themes"
                disabled
              >
                Integrate beautiful themes to your components.
              </ListItem>
              <ListItem
                href="/components"
                title="Components"
                disabled
              >
                Beautifully designed components that you can copy and paste into your apps.
              </ListItem>
              <ListItem
                href="https://github.com/AntonioErdeljac/next13-supabase-template"
                title="GitHub"
              >
                Open Source template
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
