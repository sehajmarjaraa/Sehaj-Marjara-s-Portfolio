import { contact, site } from "../content";
import { Cell } from "../selection";
import { onEmailClick } from "../email";
import { LinkIcon, MailIcon } from "../icons";

/** Contact as a yellow "Insert Comment" note pinned to a cell. */
export function Contact() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl" id="contact-section">
      <div className="relative">
        {/* The "cell" the comment is anchored to */}
        <Cell
          cellRef="D30"
          className="relative bg-white border border-gridline shadow-sm w-44 px-3 py-2 text-[13px] text-gray-700 font-medium mb-6"
        >
          Let's connect
          <span className="absolute top-0 right-0 w-0 h-0 border-t-[7px] border-l-[7px] border-t-red-600 border-l-transparent" />
        </Cell>

        {/* The comment note */}
        <div className="pointer-events-auto relative bg-[#fffbd6] border border-[#e3d98a] shadow-md p-5 sm:p-6 max-w-xl rotate-[-0.4deg]">
          <span className="absolute -top-2 left-10 w-4 h-4 bg-[#fffbd6] border-l border-t border-[#e3d98a] rotate-45" />
          <div className="text-[12px] font-bold text-gray-800 mb-1">{site.name}:</div>
          <p className="text-[13px] text-gray-700 leading-relaxed mb-4">{contact.note}</p>

          <div className="flex flex-col gap-2 text-[13px] text-gray-800">
            <span className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-gray-500" />
              <a href={`mailto:${contact.email}`} onClick={onEmailClick} className="underline decoration-dotted hover:text-excel-green">
                {contact.email}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gray-500 text-[14px] w-4 text-center">☏</span>
              <a href="tel:+15179804654" className="underline decoration-dotted hover:text-excel-green">
                {contact.phone}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-500" />
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener"
                className="underline decoration-dotted hover:text-excel-green"
              >
                {contact.linkedinLabel}
              </a>
            </span>
          </div>

          {/* Excel form button */}
          <a
            href={`mailto:${contact.email}?subject=Saw your portfolio — let's talk`}
            onClick={onEmailClick}
            className="mt-5 inline-block bg-[#ececec] border border-gray-400 shadow-[1px_1px_0_#9a9a9a] active:shadow-none active:translate-x-px active:translate-y-px px-4 py-1.5 text-[13px] text-gray-800 font-medium"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
