import FormField from '../components/forms/FormField'
import FormLayout from '../components/forms/FormLayout'
import { SelectInput, SubmitButton, TextArea, TextInput } from '../components/forms/fields'
import InfoCard from '../components/ui/InfoCard'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import { contactAside, contactHeading, contactRoles } from '../content/contact'

export default function ContactPage() {
  return (
    <>
      <PageSection>
        <SectionHeading {...contactHeading} />
      </PageSection>

      <FormLayout
        form={
          <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
            <InfoCard>
              <div className="grid gap-3">
                <FormField label="Name">
                  <TextInput type="text" name="name" placeholder="Your Name" />
                </FormField>

                <FormField label="Email">
                  <TextInput type="email" name="email" placeholder="Work Email" />
                </FormField>

                <FormField label="Organization">
                  <TextInput
                    type="text"
                    name="organization"
                    placeholder="Lab / Company / Institution"
                  />
                </FormField>

                <FormField label="Role">
                  <SelectInput name="role" defaultValue="">
                    <option value="" disabled>
                      Select your role
                    </option>
                    {contactRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </SelectInput>
                </FormField>

                <FormField label="What does your agent do?">
                  <TextArea
                    name="agent"
                    rows="4"
                    placeholder="Describe your agent and what tasks it is designed to handle."
                  />
                </FormField>

                <FormField label="Areas of interest">
                  <TextInput
                    type="text"
                    name="interest"
                    placeholder="SFT Data, RLaaS, Healthcare/Finance Envs, Tool Use, Voice/Image Models"
                  />
                </FormField>

                <SubmitButton>Let&apos;s Test Your Agent →</SubmitButton>
              </div>
            </InfoCard>
          </form>
        }
        aside={
          <InfoCard title={contactAside.title}>
            {contactAside.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <p>
              Direct email:{' '}
              <a className="text-white" href={`mailto:${contactAside.email}`}>
                {contactAside.email}
              </a>
            </p>
          </InfoCard>
        }
      />
    </>
  )
}
